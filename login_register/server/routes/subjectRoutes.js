// routes/subjectRoutes.js
import express from 'express';
import { subject } from '../controllers/subject-controller.js';

const router = express.Router();

router.route('/match')
  .post(subject);

export default router;
