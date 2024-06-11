import subjectModel from "../models/subject-model.js";

const subject = async (req, res) => {
    const { email, subjects } = req.body;
    console.log(email);
    const update = { subjects: subjects };
    const options = { new: true, upsert: true };

    try {
        const result = await subjectModel.findOneAndUpdate({ email: email }, update, options);
        res.status(200).send({ message: "OK" });;
    } catch (err) {
        console.error("Error updating or creating subject:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

export { subject };