import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { logger } from "../utils/logger.js";
import { Env } from "../config/env.config.js";
import HTTP_STATUS from "../config/http.config.js";

const { JsonWebTokenError, TokenExpiredError } = jwt;

const handleCastError = (err) =>
  new AppError(
    `Invalid value "${err.value}" for field "${err.path}"`,
    HTTP_STATUS.BAD_REQUEST,
  );

const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(messages.join(". "), HTTP_STATUS.BAD_REQUEST);
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(
    `An account with this ${field} already exists`,
    HTTP_STATUS.CONFLICT,
  );
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", HTTP_STATUS.UNAUTHORIZED);

const handleJWTExpiredError = () =>
  new AppError(
    "Your session has expired. Please log in again.",
    HTTP_STATUS.UNAUTHORIZED,
  );

function isDuplicateKeyError(err) {
  return err && typeof err === "object" && err.code === 11000 && err.keyValue;
}

function normaliseError(err) {
  if (err instanceof TokenExpiredError) return handleJWTExpiredError();
  if (err instanceof JsonWebTokenError) return handleJWTError();
  if (err instanceof mongoose.Error.CastError) return handleCastError(err);
  if (err instanceof mongoose.Error.ValidationError)
    return handleValidationError(err);
  if (isDuplicateKeyError(err)) return handleDuplicateKeyError(err);

  return err;
}

export const errorHandler = (err, req, res, _next) => {
  const error = normaliseError(err);

  if (error instanceof AppError) {
    logger.warn(
      `[${req.method}] ${req.path} → ${error.statusCode}: ${error.message}`,
    );

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      ...(Env.IS_DEVELOPMENT && { stack: error.stack }),
    });
  }

  logger.error(`[${req.method}] ${req.path} → unhandled error:`, error);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: Env.IS_PRODUCTION
      ? "Something went wrong. Please try again later."
      : String(error),
    ...(Env.IS_DEVELOPMENT && error instanceof Error && { stack: error.stack }),
  });
};

export const notFoundHandler = (req, _res, next) => {
  next(
    new AppError(`Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND),
  );
};
