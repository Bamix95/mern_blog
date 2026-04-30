import { Env } from "../config/env.config.js";

export const setTokenCookie = (res, token) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    secure: Env.IS_PRODUCTION,
    sameSite: Env.IS_PRODUCTION ? "strict" : "lax",
    maxAge: ONE_DAY,
    path: "/",
  });
};

export const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: Env.IS_PRODUCTION,
    sameSite: Env.IS_PRODUCTION ? "strict" : "lax",
    expires: new Date(0),
    path: "/",
  });
};
