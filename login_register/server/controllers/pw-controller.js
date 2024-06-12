import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = express.Router();

const resetPW = async (req, res) => {
    const { email } = req.body;

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Create the reset link
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.JWT_EMAIL,
            pass: process.env.JWT_APP_PW
        }
    });

    const mailOptions = {
        from: `<${process.env.JWT_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Reset Your Password', // Subject line
        text: `Click on the link below to reset your password:\n${resetLink}`, // plain text body
        // html: '<b>Click on the link below to reset your password:</b><br><a href="' + resetLink + '">Reset Password</a>' // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send reset email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Password reset email sent' });
        }
    });
}

export { resetPW };