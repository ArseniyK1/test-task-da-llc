import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware";
import { UserService } from "../services";
import { UserInfoDto } from "../dto";

export class UserController {
  constructor(private userService: UserService) {}

  getInfo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      res.json({
        id: req.userId,
      } as UserInfoDto);
    } catch (error) {
      next(error);
    }
  };
}
