import mongoose from "mongoose";
import { Env } from "./env.config.js";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Env.MONGODB_URI, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongDB disconnected. Attempting reconnection...");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error:", err);
    });
  } catch (error) {
    logger.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
};
