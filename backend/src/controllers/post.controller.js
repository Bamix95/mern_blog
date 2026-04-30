import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ForbiddenError, NotFoundError } from "../utils/appError.js";
import HTTP_STATUS from "../config/http.config.js";

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ status: "published" })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .select("title slug excerpt category readingTime author publishedAt");

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: posts,
  });
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    status: "published",
  }).populate("author", "name");

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: post,
  });
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, body, category, status } = req.body;

  const post = await Post.create({
    title,
    body,
    category,
    status: status || "draft",
    author: req.user.userId,
  });

  return res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    message:
      post.status === "published"
        ? "Post published successfully"
        : "Draft saved successfully",
    data: post,
  });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (post.author.toString() !== req.user.userId) {
    throw new ForbiddenError("You are not allowed to edit this post");
  }

  const { title, body, category, status } = req.body;

  if (title) post.title = title;
  if (body) post.body = body;
  if (category) post.category = category;
  if (status) post.status = status;

  await post.save();

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "Post updated successfully",
    data: post,
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    throw new NotFoundError("Post not found.");
  }

  if (post.author.toString() !== req.user.userId) {
    throw new ForbiddenError("You are not allowed to delete this post");
  }

  await post.deleteOne();

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

export const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user.userId })
    .sort({ createdAt: -1 })
    .select("title slug category status readingTime publishedAt createdAt");

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: posts,
  });
});

export const getPostForEdit = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    author: req.user.userId,
  }).populate("author", "name");

  if (!post) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: post,
  });
});
