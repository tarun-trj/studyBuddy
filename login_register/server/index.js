// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import employeeRouter from './routes/auth-router.js';
import subjectRouter from './routes/subjectRoutes.js';
import matchingRouter from './routes/find-match-router.js'; // Import the new matching router
import { startScheduledTasks } from './controllers/match-controller.js';
import errorHandler from './middleware/error-middleware.js';
import allUsersRouter from './controllers/all-user-controller.js';

const time = 6000000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(employeeRouter);
app.use(subjectRouter);
app.use(matchingRouter);
app.use(allUsersRouter);

startScheduledTasks(time);

app.use(errorHandler);
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
