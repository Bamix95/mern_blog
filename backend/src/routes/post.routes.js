import { Router } from "express";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  getPostForEdit,
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/my-posts", authenticate, getMyPosts);
router.get("/edit/:slug", authenticate, getPostForEdit);
router.get("/:slug", getPostBySlug);
router.post("/", authenticate, createPost);
router.patch("/:slug", authenticate, updatePost);
router.delete("/:slug", authenticate, deletePost);

export default router;
