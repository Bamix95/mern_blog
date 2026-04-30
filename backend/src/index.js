import app from "./app.js";
import { logger } from "./utils/logger.js";
import { Env } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! Shutting down...", err);
  process.exit(1);
});

const init = async () => {
  await connectDB();

  const server = app.listen(Env.PORT, () => {
    logger.info(`Server running on port ${Env.PORT} [${Env.NODE_ENV}]`);
    logger.info(`API available at http://localhost:${Env.PORT}/api`);
  });

  process.on("unhandledRejection", (err) => {
    logger.error("UNHANDLED REJECTION! Shutting down...", err);
    server.close(() => process.exit(1));
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Gracefully shutting down...");
    server.close(() => {
      logger.info("Process terminated");
      process.exit(0);
    });
  });
};

init();
