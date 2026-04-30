import User from "../models/user.model.js";
import { UnauthorizedError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/token.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError(
      "Unauthenticated, please login/register to continue",
    );
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  req.user = {
    userId: user._id.toString(),
    email: user.email,
  };

  next();
});
