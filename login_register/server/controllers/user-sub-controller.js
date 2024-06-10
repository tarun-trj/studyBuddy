import studentModel from "../models/student-model.js";

const addSub = async (req, res) => {
    try {
        const { email, subject } = req.body;

        // Validate input
        if (!email || !subject) {
            return res.status(400).send({ message: "Student email and subject are required." });
        }

        // Find the student by ID and update their subjects
        const student = await studentModel.findOne({email: email});
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
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

const getSub = async(req, res) => {
    try {
        const {email} = req.body;
        
        if(!email) {
            return res.status(400).send({ message: "Student email." });
        }

        const student = studentModel.findOne({email : email});
        res.status(200).send({ message: "Student and subjects found"}, student.subjects);
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).send({ message: "Internal Server Error." });
    }
}


const userSubController = { addSub, deleteSub, getSub };
export { userSubController };