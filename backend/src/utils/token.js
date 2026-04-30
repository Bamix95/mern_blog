import jwt from "jsonwebtoken";
import { Env } from "../config/env.config.js";

export const generateToken = (user) => {
  const payload = {
    userId: String(user._id),
    email: user.email,
  };

  return jwt.sign(payload, Env.JWT_TOKEN_SECRET, {
    expiresIn: Env.JWT_TOKEN_EXPIRES,
    issuer: "inkwell-blog",
    audience: "inkwell-blog-client",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, Env.JWT_TOKEN_SECRET, {
    issuer: "inkwell-blog",
    audience: "inkwell-blog-client",
  });
};
