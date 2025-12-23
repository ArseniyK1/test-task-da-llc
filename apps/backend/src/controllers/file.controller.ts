import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware';
import { FileService } from '../services';

export class FileController {
  constructor(private fileService: FileService) {}

  upload = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  getList = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  download = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  };
}

