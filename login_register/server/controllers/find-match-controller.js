import matchModel from "../models/match-model.js";
import subjectModel from "../models/subject-model.js";

const find = async (req, res) => {
    console.log(req);
    const { email } = req.body; // Get email from the request body
    console.log(req.body);
    if (!email) {
        return res.status(400).json({ message: "Email field is required." });
    }

    try {
        // Find the match where the employee's email could be either email1 or email2
        const match = await matchModel.findOne({ $or: [{ email1: email }, { email2: email }] });
        const check = await subjectModel.findOne({ email: email });

        if(!check) {
            return res.status(404).json({ message: "Enter subjects again." });
        }

        if (!match) {
            return res.status(414).json({ message: "No match found for the provided email." });
        }

        // Determine the partner's email based on which email matches the provided one
        const emailRes = (email === match.email1) ? match.email2 : match.email1;
        res.json({ emailRes }); // Send the partner's email as a response
    } catch (error) {
        console.error("Failed to retrieve match:", error);
        res.status(500).json({ message: "Failed to retrieve match due to server error." });
    }
}

export { find };