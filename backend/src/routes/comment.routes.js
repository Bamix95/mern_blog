import { Router } from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router({ mergeParams: true });

router.route("/").get(getComments).post(authenticate, addComment);

export const commentDeleteRouter = Router();
commentDeleteRouter.delete("/:id", authenticate, deleteComment);

export default router;
