import { Request, Response, NextFunction } from "express";
import { UserService, AuthService } from "../services";
import { SignInDto, SignUpDto, RefreshTokenDto, AuthResponseDto } from "../dto";
import { AuthRequest } from "../middleware";

export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, password } = req.body as SignInDto;

      if (!id || !password) {
        return res
          .status(400)
          .json({ message: "ID и пароль являются обязательными" });
      }

      const { accessToken, refreshToken } = await this.userService.login(
        id,
        password
      );

      res.json({
        accessToken,
        refreshToken,
      } as AuthResponseDto);
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }
      next(error);
    }
  };

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, password } = req.body as SignUpDto;

      if (!id || !password) {
        return res
          .status(400)
          .json({ message: "ID и пароль являются обязательными" });
      }

      const { user, accessToken, refreshToken } =
        await this.userService.register(id, password);

      res.status(201).json({
        accessToken,
        refreshToken,
      } as AuthResponseDto);
    } catch (error: any) {
      if (error.message === "User already exists") {
        return res.status(409).json({ message: error.message });
      }
      if (error.message.includes("Invalid id format")) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body as RefreshTokenDto;

      if (!refreshToken) {
        return res
          .status(400)
          .json({ message: "Refresh токен является обязательным" });
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      } as AuthResponseDto);
    } catch (error: any) {
      if (
        error.message.includes("Invalid") ||
        error.message.includes("not found")
      ) {
        return res.status(401).json({ message: error.message });
      }
      next(error);
    }
  };

  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const accessToken = authHeader.substring(7);
      await this.authService.logout(accessToken);

      res.json({ message: "Вы успешно вышли из системы" });
    } catch (error) {
      next(error);
    }
  };
}
