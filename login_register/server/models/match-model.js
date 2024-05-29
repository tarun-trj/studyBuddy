import mongoose from 'mongoose';

const matchedSchema = new mongoose.Schema({
    email1: { type: String, required: true },
    email2: { type: String, required: true },
    time: { type: Number, required: true, default: 1 }  // Using Number for timestamp and setting default
});

const matchedModel = mongoose.model("Matched", matchedSchema);
export default matchedModel;
