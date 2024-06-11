import { userSubController } from "../controllers/user-sub-controller.js";
import express from 'express';

const router = express.Router();

router.route("/user-subject")
    .post(userSubController.addSub)
    .delete(userSubController.deleteSub)
    .get(userSubController.getSub);

export default router;