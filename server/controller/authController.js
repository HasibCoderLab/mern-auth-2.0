import { generateToken } from "../config/token.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { transporter } from "../config/nodemailer.js";


// ===============  register [APIs] ===========

export const register = async (req, res) => {
    try {
        // ============ Input Details  [Step 1]  ===========
        const { name, password, email } = req.body
        if (!name || !password || !email) {
            return res.status(400).json({ message: "Send all details" });
        };
        // ======= Check User [ Step 2]====
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "user already exist" });
        }

        // =============  Password Hass [Step 3] =====
        const hassPassword = await bcrypt.hash(password, 11);

        // ============== Create User [ Step 4] ==================
        const user = await User.create({
            name,
            email,
            password: hassPassword
        });


        // console.log(user);



        // ==========  Token + cookie  [Step 5] ===========
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // ===== Sending Weccome SMS ==============

        const mailOPtions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome To Our  Website",
            text: `Welcome to our website .Your account has been created with email id : ${email}`
        }
        await transporter.sendMail(mailOPtions);


        // ================ Success message  ===========
        return res.status(201).json({
            success: true,
            message: "user successfuly create",
            user: {
                name, email
            }

        }

        );

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// ============== || Login [APIs] || ======== 

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required ' })
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Emeil" });

        }
        // ============ Password Compare ==============
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        // ================= Token + cookie ==========
        let token = await generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
    // success: true,       
    message: "Login successful",
    user: {
        name: user.name,
        email: user.email,
    }
});

        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// ===============  logout [APIs] ===========

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}


// ========  Send Verification  OTP  to the User's Email [APIs] ==============
export const sendVerifyOtp = async (req, res) => {

    try {
        const { userId } = req.body;
        // ========== Check user ============
        const user = await User.findById(userId);
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account Already verified" });
        }

        // ============= OTP =============
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = new Date() + 24 * 60 * 60 * 1000;
        await user.save();

        // ============== Mail ==============

        const mailOPtions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp} . verify your account using  this OTP `
        }

        await transporter.sendMail(mailOPtions);

        res.status(200).json({ success: true, message: "Verification OTP Sent on Email" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// =============== verufy Email [APIs] =========

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Missing Details" });
    }
    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //  ============ It's Valid OTP ? ============
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OPT" });

        }

        //  ============ Check Expired OTP ? ============
        if (user.verifyOtpExpireAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({ success: true, message: "Email Verified successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}

//  =====  Check if user is authenticated. ================= 

export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}


//  =====  Send Password Reset OTP ================= 

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email is required' })
        }
        // ============ Create OTP ==================
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000
        await user.save();
        const mailOPtions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}.Use this OTP to proceed with resetting your password.`

        }

        await transporter.sendMail(mailOPtions);

        return res.json({ success: true, message: 'OTP sent to your email' });

        I

        // return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}


//  ===============  Reset Usr Password ============ 
export const resetPassword = async (req,res) =>{
const { email, otp, newPassword } = req.body;

if (!email || !otp || !newPassword) {

    return res.status(400).json({ success: false, message: "Email,OTP ,and new password are required" });
}
try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid otp" });

    }

    if (user.resetOtpExpireAt <   Date.now()) {
        return res.json({ success: false, message: ' OTP Expired' });

    }
    const hashPassword = await bcrypt.hash(newPassword, 11);
    user.password = hashPassword;
    user.resetOtp = "",
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({ success: true, message: 'Password has been reset successfully' });
} catch (error) {
    return res.status(500).json({ success: false, message: error.message });
}

}

