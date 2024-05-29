import subjectModel from "../models/subject-model.js";

const subject = async (req, res) => {
    const { subjects, email } = req.body;
    const update = { subjects: subjects };
    const options = { new: true, upsert: true };

    try {
        const result = await subjectModel.findOneAndUpdate({ email: email }, update, options);
        res.json(result);
    } catch (err) {
        console.error("Error updating or creating subject:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

export { subject };