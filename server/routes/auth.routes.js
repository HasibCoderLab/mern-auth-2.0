import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controller/authController.js"
import express from "express"
import { userAuth } from "../middleware/userAuth.js";
import { getUserData } from "../controller/userController.js";

export const authRouter = express.Router()


authRouter.post("/register" ,register);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/send-verif-otp", userAuth,sendVerifyOtp);
authRouter.post("/verif-account", userAuth,verifyEmail);
authRouter.get("/is-auth", userAuth,isAuthenticated);
authRouter.post("/send-reset-opt", sendResetOtp);
authRouter.post("/reset-password", resetPassword);
// authRouter.get("/" , getUserData)




