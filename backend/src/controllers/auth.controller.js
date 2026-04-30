import HTTP_STATUS from "../config/http.config.js";
import User from "../models/user.model.js";
import { ConflictError, UnauthorizedError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clearTokenCookie, setTokenCookie } from "../utils/cookie.js";
import { compareValue, hashValue } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ConflictError("User already exist with this email address");
  }
  const hashedPassword = await hashValue(password, 12);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    message: "User registered successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const isPasswordValid = await compareValue(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const token = generateToken(user);
  setTokenCookie(res, token);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "User logged in successfully",
    data: user.toObject(),
  });
});

export const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new UnauthorizedError("Not authenticated");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: user,
  });
});
