import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import { authRouter } from "./routes/auth.Routes.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors())


app.use("/",authRouter)

const port = process.env.PORT || 4000

app.listen(port , () =>{
    connectDB()
console.log(`Server Stated at ${port}`);

});