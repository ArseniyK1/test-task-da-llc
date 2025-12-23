import { Router } from 'express';
import { AuthController } from '../controllers';

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post('/signin', authController.signIn);
  router.post('/signin/new_token', authController.refreshToken);
  router.post('/signup', authController.signUp);
  router.get('/logout', authController.logout);

  return router;
};

