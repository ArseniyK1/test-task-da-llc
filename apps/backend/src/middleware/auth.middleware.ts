import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import { AuthRepository } from "../repositories";

export interface AuthRequest extends Request {
  userId?: string;
}

// реализация синглтона
let authServiceInstance: AuthService | null = null;

const getAuthService = (): AuthService => {
  if (!authServiceInstance) {
    const authRepository = new AuthRepository();
    authServiceInstance = new AuthService(authRepository);
  }
  return authServiceInstance;
};

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const token = authHeader.substring(7);
    const authService = getAuthService();
    const payload = await authService.validateAccessToken(token);

    if (!payload) {
      return res
        .status(401)
        .json({ message: "Неверный или просроченный токен" });
    }

    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Не авторизован" });
  }
};
