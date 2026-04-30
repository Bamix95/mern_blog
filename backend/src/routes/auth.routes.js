import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { strictLimiter } from "../middlewares/rateLimit.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post("/register", strictLimiter, validate(registerSchema), register);
router.post("/login", strictLimiter, validate(loginSchema), login);

router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;
