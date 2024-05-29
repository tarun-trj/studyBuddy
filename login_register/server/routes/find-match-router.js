import { find } from '../controllers/find-match-controller.js';
import express from 'express';

const router = express.Router();

router.route('/find')
  .post(find);

export default router;
