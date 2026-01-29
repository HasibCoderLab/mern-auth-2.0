import { generateToken } from "../config/token.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const { name, password, email } = req.body
        if (!name || !password || !email) {
            return res.status(400).json({ message: "Send all details" });
        };
        // ======= Check User ====
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "user already exist" });
        }

        // =============  Password Hass =====
        const hassPassword = await bcrypt.hash(password, 11);


        const user = User.create({
            name,
            email,
            password: hassPassword
        });


        console.log(user);



        // ==========  Token + cookie  ===========
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });




        return res.status(201).json({
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
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
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