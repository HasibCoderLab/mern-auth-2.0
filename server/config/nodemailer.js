import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
host:'smtp-relay.brevo.com',
Port:465,
auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASSWORD
}

}); 