import { find } from '../controllers/find-match-controller.js';
import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';


const router = express.Router();

router.route('/find')
  .post(authMiddleware, find);

export default router;
