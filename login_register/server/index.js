// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import employeeRouter from './routes/employeeRoutes.js';
import subjectRouter from './routes/subjectRoutes.js';
import matchRouter from './routes/matchRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(employeeRouter);
app.use(subjectRouter);
app.use(matchRouter);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
