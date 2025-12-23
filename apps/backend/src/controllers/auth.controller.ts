import { Request, Response, NextFunction } from 'express';
import { UserService, AuthService } from '../services';

export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };
}

