import winston from "winston";
import { Env } from "../config/env.config.js";

const { combine, timestamp, errors, json, colorize, simple } = winston.format;

export const logger = winston.createLogger({
  level: Env.IS_PRODUCTION ? "info" : "debug",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json(),
  ),

  defaultMeta: { service: "blog-service" },

  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],

  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: "logs/rejections.log",
    }),
  ],
});

if (!Env.IS_PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), simple()),
    }),
  );
}
