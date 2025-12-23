import express from "express";
import { corsMiddleware, errorMiddleware } from "./middleware";
import { createAuthRouter, createUserRouter, createFileRouter } from "./routes";
import { AuthController, UserController, FileController } from "./controllers";
import { UserService, AuthService, FileService } from "./services";
import { UserRepository, AuthRepository, FileRepository } from "./repositories";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);

  // ========================= репы =========================
  const userRepository = new UserRepository();
  const authRepository = new AuthRepository();
  const fileRepository = new FileRepository();
  // ========================= репы =========================

  // ========================= сервисы =========================
  const authService = new AuthService(authRepository);
  const userService = new UserService(userRepository, authService);
  const fileService = new FileService(fileRepository);
  // ========================= сервисы =========================

  // ========================= контроллеры =========================
  const authController = new AuthController(userService, authService);
  const userController = new UserController(userService);
  const fileController = new FileController(fileService);
  // ========================= контроллеры =========================

  // ========================= роуты =========================
  app.use("/", createAuthRouter(authController));
  app.use("/", createUserRouter(userController));
  app.use("/file", createFileRouter(fileController));
  // ========================= роуты =========================

  // ========================= middleware =========================
  app.use(errorMiddleware);
  // ========================= middleware =========================

  return app;
};
