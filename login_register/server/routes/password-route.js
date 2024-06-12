import express from 'express';
import { resetPW } from '../controllers/pw-controller.js'

const router = express.Router();

router.route('/reset')
    .post(resetPW);

export default router;