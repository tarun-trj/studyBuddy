import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    subjects: [{ type: String, required: true }], // Array of strings
    email: { type: String, required: true }
});

const SubjectModel = mongoose.model("Subject", subjectSchema);
export default SubjectModel;
