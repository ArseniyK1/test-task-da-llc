import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware';
import { UserService } from '../services';

export class UserController {
  constructor(private userService: UserService) {}

  getInfo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };
}

