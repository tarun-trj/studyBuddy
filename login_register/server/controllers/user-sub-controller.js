import studentModel from "../models/student-model.js";

const addSub = async (req, res) => {
    try {
        const { email, subject } = req.body;

        // Validate input
        if (!email || !subject) {
            return res.status(400).send({ message: "Student email and subject are required." });
        }

        // Find the student by ID and update their subjects
        const student = await studentModel.findOne({ email: email });
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }

        // Check if the subject already exists
        if (student.subjects.includes(subject)) {
            return res.status(400).send({ message: "Subject already exists." });
        }

        // Add the new subject
        student.subjects.push(subject);
        student.subNum = student.subjects.length;

        // Save the updated student profile
        await student.save();

        res.status(200).send({ message: "Subject added successfully.", student });
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).send({ message: "Internal Server Error." });
    }
};


const deleteSub = async (req, res) => {
    try {
        const { email, subject } = req.body;

        // Validate input
        if (!email || !subject) {
            return res.status(400).send({ message: "Student email and subject are required." });
        }

        // Find the student by email
        const student = await studentModel.findOne({ email });
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }

        // Remove the subject
        const subjectIndex = student.subjects.indexOf(subject);
        if (subjectIndex === -1) {
            return res.status(404).send({ message: "Subject not found." });
        }

        student.subjects.splice(subjectIndex, 1);
        student.subNum = student.subjects.length;

        // Save the updated student profile
        await student.save();

        res.status(200).send({ message: "Subject deleted successfully.", student });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).send({ message: "Internal Server Error." });
    }
};

const getSub = async (req, res) => {
    const email = req.headers['user-email'];

    if (!email) {
        return res.status(400).json({ message: "User email header is missing" });
    }

    try {
        const list = await studentModel.findOne({ email }).populate('subjects');
        if (!list) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ subjects: list.subjects });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const userSubController = { addSub, deleteSub, getSub };
export { userSubController };