import { Router } from "express";
import { AuthController } from "../controllers";
import { authMiddleware } from "../middleware";

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post("/signin", authController.signIn);
  router.post("/signin/new_token", authController.refreshToken);
  router.post("/signup", authController.signUp);
  router.get("/logout", authMiddleware, authController.logout);

  return router;
};
