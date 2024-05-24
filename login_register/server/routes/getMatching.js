import express from 'express';
import MatchModel from '../models/MatchedModel.js' // Ensure this path is correct

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Route to get matches by employee email using POST method
router.post('/find', async (req, res) => {
    const { email } = req.body; // Get email from the request body
    console.log(req.body);
    if (!email) {
        return res.status(400).json({ message: "Email field is required." });
    }

    try {
        // Find the match where the employee's email could be either email1 or email2
        const match = await MatchModel.findOne({ $or: [{ email1: email }, { email2: email }] });

        if (!match) {
            return res.status(404).json({ message: "No match found for the provided email." });
        }

        // Determine the partner's email based on which email matches the provided one
        const emailRes = (email === match.email1) ? match.email2 : match.email1;
        res.json({ emailRes }); // Send the partner's email as a response
    } catch (error) {
        console.error("Failed to retrieve match:", error);
        res.status(500).json({ message: "Failed to retrieve match due to server error." });
    }
});

export default router;