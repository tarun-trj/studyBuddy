import express from "express";
import studentModel from "../models/student-model.js"; // Make sure this path and model name are correct

const router = express.Router();

router.get("/AllUsers", async (req, res) => {
  try {
    const users = await studentModel.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.json(users);
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching users." });
  }
});

export default router;
