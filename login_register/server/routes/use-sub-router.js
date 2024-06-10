import { userSubController } from "../controllers/user-sub-controller.js";
import express from 'express';
import studentModel from "../models/student-model.js";

const router = express.router();

router.route("/user-subs")
    .delete(userSubController.delSub)
    .get(userSubController.getSub)
    .post(userSubController.addSub);

export default router;