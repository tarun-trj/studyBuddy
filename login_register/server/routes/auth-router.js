import express from 'express';
import authControllers from '../controllers/auth-controller.js';
import { signupSchema, loginSchema } from '../validator/auth-validator.js';
import validate from '../middleware/validate.js';
//import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.route('/register')
  .post(validate(signupSchema), authControllers.register);

router.route('/login')
  .post(validate(loginSchema), authControllers.login);

// router.route('/user')
//   .get(authMiddleware, authControllers.user);

export default router;
