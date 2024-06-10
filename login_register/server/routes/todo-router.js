import express from 'express';
import listModel from '../models/todo-list-model.js';
import taskModel from '../models/todo-task-model.js';
import { taskController } from '../controllers/todo-controller.js';

const router = express.Router();

router.route('/tasks').get(taskController.getTasks);

router.route('/tasks').post(taskController.addTask);

router.route('/tasks/:id')
  .put(taskController.toggleTask)
  .delete(taskController.delTask);

export default router;