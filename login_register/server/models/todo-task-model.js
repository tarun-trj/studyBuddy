import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
