// getmatching.js
import express from 'express';
import MatchedModel from '../models/MatchedModel.js';
import EmployeeModel from '../models/EmployeeModel.js';

const router = express.Router();

// Endpoint to get partner email based on user's email provided in the request body
router.post('/match', async (req, res) => {
    const userEmail = req.body.email;

    try {
        // Find the match record for the given email
        const match = await MatchedModel.findOne({ $or: [{ email1: userEmail }, { email2: userEmail }] });

        if (!match) {
            return res.status(404).json({ message: 'No match found' });
        }

        // Determine the partner's email
        const partnerEmail = match.email1 === userEmail ? match.email2 : match.email1;

        // Find the partner's employee record
        const partner = await EmployeeModel.findOne({ email: partnerEmail });

        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        // Return the partner's email
        res.json({ partnerEmail: partner.email });

    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
