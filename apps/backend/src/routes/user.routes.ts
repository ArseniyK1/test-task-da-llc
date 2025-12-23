import { Router } from 'express';
import { UserController } from '../controllers';
import { authMiddleware } from '../middleware';

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.get('/info', authMiddleware, userController.getInfo);

  return router;
};

