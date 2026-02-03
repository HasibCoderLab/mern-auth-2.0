import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controller/authController.js"
import express from "express"
import { userAuth } from "../middleware/userAuth.js";

export const authRouter = express.Router()


authRouter.post("/register" ,register);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/send-verif-otp", userAuth,sendVerifyOtp);
authRouter.post("/verif-account", userAuth,verifyEmail);
authRouter.post("/is-auth", userAuth,isAuthenticated);
authRouter.post("/send-reset-opt", sendResetOtp);
authRouter.post("/reset-password", resetPassword);




