const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    // Send user data upon successful login
                    res.json({ message: "Login Success", user });
                } else {
                    res.json({ message: "Password is wrong" });
                }
            } else {
                res.json({ message: "User not found" });
            }
        })
        .catch((err) => {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});
app.post('/register', (req,res) => {
    const { name, email, password, branch, semester } = req.body;
    EmployeeModel.create({ name, email, password, branch, semester })
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.listen(3002, () => {
    console.log("Server is running")
})