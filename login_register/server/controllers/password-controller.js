import jwt from 'jsonwebtoken';
import User from '../models/student-model.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
    }

    res.status(200).send({ error: false, message: 'Email exists' });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ error: false, message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).send({ error: true, message: 'Invalid token' });
    }

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ error: false, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
};

export default { checkEmailExists, requestPasswordReset, resetPassword };
