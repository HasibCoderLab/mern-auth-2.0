import jwt from "jsonwebtoken"
export const  generateToken = async (id) =>{
    let token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    return token
} 
