import rateLimit from "express-rate-limit";
import HTTP_STATUS from "../config/http.config.js";

export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },

  handler: (req, res) => {
    res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
      status: "fail",
      message: "Too many requests, please try again later.",
    });
  },
});

export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many request from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
