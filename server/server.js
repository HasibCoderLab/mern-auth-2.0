import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import { authRouter } from "./routes/auth.Routes.js";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config()
const app = express();
app.use(cors({credentials:true}));


app.use(express.json());
app.use(cookieParser());

// app.use(cors())

app.get('/',(req,res) =>{
    res.send("The req")
})
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)


const port = process.env.PORT || 4000

app.listen(port , () =>{
    connectDB()
console.log(`Server Stated at ${port}`);

});