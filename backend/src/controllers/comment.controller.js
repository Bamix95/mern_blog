import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/appError.js";

export const getComments = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  const comments = await Comment.find({ post: post._id })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    status: "success",
    data: comments,
  });
});

export const addComment = asyncHandler(async (req, res) => {
  const { body } = req.body;

  if (!body?.trim()) {
    throw new ValidationError("Invalid body format");
  }

  const post = await Post.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  const comment = await Comment.create({
    body: body.trim(),
    author: req.user.userId,
    post: post._id,
  });

  await comment.populate("author", "name");

  return res.status(201).json({
    status: "success",
    message: "Comment added",
    data: comment,
  });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  if (comment.author.toString() !== req.user.userId) {
    throw new ForbiddenError("You are not allowed to delete this comment");
  }

  await comment.deleteOne();

  return res.status(200).json({
    status: "success",
    message: "Comment deleted",
  });
});
