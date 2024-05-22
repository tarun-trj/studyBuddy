// routes/employeeRoutes.js
import express from 'express';
import EmployeeModel from '../models/EmployeeModel.js';

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json({ message: "Login Success", user });
            } else {
                res.json({ message: "Password is wrong" });
            }
        } else {
            res.json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password, branch, semester } = req.body;
    try {
        const employee = await EmployeeModel.create({ name, email, password, branch, semester });
        res.json(employee);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
