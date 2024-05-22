// routes/subjectRoutes.js
import express from 'express';
import SubjectModel from '../models/SubjectModel.js';

const router = express.Router();

router.post('/match', async (req, res) => {
    const { subjects, email } = req.body;
    const update = { subjects: subjects };
    const options = { new: true, upsert: true };

    try {
        const result = await SubjectModel.findOneAndUpdate({ email: email }, update, options);
        res.json(result);
    } catch (err) {
        console.error("Error updating or creating subject:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
});

export default router;
