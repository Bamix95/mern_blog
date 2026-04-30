import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import hpp from "hpp";
import morgan from "morgan";
import { Env } from "../config/env.config.js";
import { logger } from "../utils/logger.js";
import { generalRateLimit } from "./rateLimit.js";

export const applySecurityMiddleware = (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: Env.IS_PRODUCTION ? undefined : false,
      crossOriginEmbedderPolicy: Env.IS_PRODUCTION,
    }),
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [Env.CLIENT_URL];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: Origin ${origin} not allowed`));
        }
      },
      credentials: true,
      methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(generalRateLimit);

  app.use(compression());

  app.use(cookieParser(Env.COOKIE_SECRET));

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  app.use(hpp());

  if (Env.IS_DEVELOPMENT) {
    app.use(morgan("dev"));
  } else {
    app.use(
      morgan("combined", {
        stream: { write: (msg) => logger.info(msg.trim()) },
        skip: (req) => req.url === "/api/health",
      }),
    );
  }
};
