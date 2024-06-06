import express from 'express';
import listModel from '../models/todo-list-model.js';
import taskModel from '../models/todo-task-model.js';

const router = express.Router();

router.route('/tasks').get( async (req, res) => {
  const email = req.headers['user-email'];

  try {
    const list = await listModel.findOne({ email }).populate('tasks');
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({ tasks: list.tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route('/tasks').post( async (req, res) => {
  const { description, email, completed } = req.body;

  try {
    // Find or create the list for the user
    let list = await listModel.findOne({ email });
    if (!list) {
      list = new listModel({ name: 'Default', email });
      await list.save();
    }

    // Create the new task
    const newTask = new taskModel({ description, listId: list._id, completed });
    await newTask.save();

    // Add the task to the list
    list.tasks.push(newTask._id);
    await list.save();

    res.status(201).json({ task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route('/tasks/:id').put(async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = completed;
    await task.save();

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
.delete(async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await listModel.updateOne({ _id: task.listId }, { $pull: { tasks: task._id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;