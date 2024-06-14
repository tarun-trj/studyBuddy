import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import studentModel from '../models/student-model.js';

const router = express.Router();

const forgotPWReq = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await studentModel.findOne({ email: email });
        if (!user) {
            console.log("No such email");
            return res.status(401).json({ message: "Email not found" });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Create the reset link
        const resetLink = `http://localhost:5173/forgot-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.JWT_EMAIL,
                pass: process.env.JWT_APP_PW,
            },
        });

        const mailOptions = {
            from: `<${process.env.JWT_EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: 'Reset Your Password', // Subject line
            text: `Click on the link below to reset your password:\n${resetLink}`, // plain text body
            html: `<b>Click on the link below to reset your password:</b><br><a href="${resetLink}">Reset Password</a>`, // html body
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
    } catch (error) {
        console.log("Error in forgotPWReq: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const setPWReq = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const secret = process.env.JWT_SECRET_KEY;

    try {
        if (!token) {
            throw new Error("Token is missing");
        }
        
        const decoded = jwt.verify(token, secret);

        // Find user by email
        const user = await studentModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = password;

        res.json({ message: 'Password has been reset' });
    } catch (error) {
        console.log("Password reset failed due to: " + error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

const changePW = async (req, res) => {
    const { token, oldPW, newPW } = req.body; // Destructure token, oldPW, newPW directly

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const userExist = await studentModel.findOne({ email: decoded.email });
        if(!userExist) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare old password
        const isPasswordCorrect = await userExist.comparePassword(oldPW);
        if(isPasswordCorrect) {
            // Update password
            userExist.password = newPW;
            await userExist.save();

            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            throw new Error("Incorrect old password");
        }
    } catch (error) {
        console.log("Password change failed due to: " + error);
        res.status(400).json({ message: 'Invalid or expired token' }, {fault: error});
    }
};

export { forgotPWReq, setPWReq, changePW };

