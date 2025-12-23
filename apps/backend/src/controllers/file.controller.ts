import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware";
import { FileService } from "../services";
import { FileResponseDto, FileListResponseDto, FileListQueryDto } from "../dto";
import fs from "fs";

export class FileController {
  constructor(private fileService: FileService) {}

  upload = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Файл является обязательным" });
      }

      const file = await this.fileService.uploadFile(req.userId, req.file);

      res.status(201).json({
        id: file.id,
        name: file.name,
        extension: file.extension,
        mimeType: file.mimeType,
        size: file.size,
        uploadDate: file.uploadDate,
      } as FileResponseDto);
    } catch (error) {
      next(error);
    }
  };

  getList = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const listSize = req.query.list_size
        ? parseInt(req.query.list_size as string, 10)
        : 10;

      if (page < 1) {
        return res.status(400).json({ message: "Страница должна быть >= 1" });
      }
      if (listSize < 1) {
        return res
          .status(400)
          .json({ message: "Размер списка должен быть >= 1" });
      }

      const result = await this.fileService.getFilesList(
        req.userId,
        page,
        listSize
      );

      res.json({
        files: result.files.map((file) => ({
          id: file.id,
          name: file.name,
          extension: file.extension,
          mimeType: file.mimeType,
          size: file.size,
          uploadDate: file.uploadDate,
        })),
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
      } as FileListResponseDto);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Неверный ID файла" });
      }

      const file = await this.fileService.getFileById(id);
      if (!file) {
        return res.status(404).json({ message: "Файл не найден" });
      }

      if (file.userId !== req.userId) {
        return res.status(403).json({ message: "Запрещено" });
      }

      res.json({
        id: file.id,
        name: file.name,
        extension: file.extension,
        mimeType: file.mimeType,
        size: file.size,
        uploadDate: file.uploadDate,
      } as FileResponseDto);
    } catch (error) {
      next(error);
    }
  };

  download = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Неверный ID файла" });
      }

      const { file, stream } = await this.fileService.downloadFile(id);

      if (file.userId !== req.userId) {
        return res.status(403).json({ message: "Запрещено" });
      }

      res.setHeader("Content-Type", file.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.name}.${file.extension}"`
      );
      res.setHeader("Content-Length", file.size.toString());

      stream.pipe(res);
    } catch (error: any) {
      if (error.message === "File not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Файл является обязательным" });
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Неверный ID файла" });
      }

      const existingFile = await this.fileService.getFileById(id);
      if (!existingFile) {
        return res.status(404).json({ message: "Файл не найден" });
      }
      if (existingFile.userId !== req.userId) {
        return res.status(403).json({ message: "Запрещено" });
      }

      const file = await this.fileService.updateFile(id, req.file);

      res.json({
        id: file.id,
        name: file.name,
        extension: file.extension,
        mimeType: file.mimeType,
        size: file.size,
        uploadDate: file.uploadDate,
      } as FileResponseDto);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Неверный ID файла" });
      }

      const file = await this.fileService.getFileById(id);
      if (!file) {
        return res.status(404).json({ message: "Файл не найден" });
      }
      if (file.userId !== req.userId) {
        return res.status(403).json({ message: "Запрещено" });
      }

      await this.fileService.deleteFile(id);

      res.json({ message: "Файл успешно удален" });
    } catch (error) {
      next(error);
    }
  };
}
