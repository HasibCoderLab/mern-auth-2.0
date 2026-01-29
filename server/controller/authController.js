import { User } from "../models/userModel.js";

export const register = async (req,res) =>{
try {
const {name,password,email} = req.body
    if (!name|| !password ||! email) {
        return res.status(400).json({message:"Send all details"});
    };
    // ======= Check User ====
    const existUser = User.findOne({email});
    if (existUser) {
        return res.status(400).json({message:"user already exist"});
    }
    
} catch (error) {
    return res.status(500).json({message:"Internal Server Error"});
}
}