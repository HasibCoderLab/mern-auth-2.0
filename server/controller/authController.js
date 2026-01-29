import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const { name, password, email } = req.body
        if (!name || !password || !email) {
            return res.status(400).json({ message: "Send all details" });
        };
        // ======= Check User ====
        let  existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "user already exist" });
        }

        // =============  Password Hass =====
        const hassPassword = await bcrypt.hash(password, 11);

        // =============  Password Hass =====
        const user = User.create({
            name, password: hassPassword, email
        });
        return res.status(201).json({
            user:{
name ,email
            }
        }
           
        )

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}