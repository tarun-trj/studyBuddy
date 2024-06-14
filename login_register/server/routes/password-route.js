import express from 'express';
import { changePW, forgotPWReq, setPWReq } from '../controllers/pw-controller.js'

const router = express.Router();

router.route('/forgot-password')
    .post(forgotPWReq);

router.route('/forgot-password/:token')
    .post(setPWReq);

router.route('/change-password')
    .post(changePW);
    
export default router;