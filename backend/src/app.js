import express from "express";
import { applySecurityMiddleware } from "./middlewares/security.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { Env } from "./config/env.config.js";
import HTTP_STATUS from "./config/http.config.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes, { commentDeleteRouter } from "./routes/comment.routes.js";

const app = express();

app.set("trust proxy", 1);

applySecurityMiddleware(app);

app.get("/api/health", (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    environment: Env.NODE_ENV,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/posts/:slug/comments", commentRoutes);
app.use("/api/comments", commentDeleteRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
