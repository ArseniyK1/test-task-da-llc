import { IFile, IFileService } from "@test-task/contracts";
import { FileRepository } from "../repositories";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

export class FileService implements IFileService {
  constructor(private fileRepository: FileRepository) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<IFile> {
    if (!file) {
      throw new Error("Файл является обязательным");
    }

    const fileExtension = path.extname(file.originalname).slice(1);
    const fileName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );

    const fileData = await this.fileRepository.create({
      userId,
      name: fileName,
      extension: fileExtension,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    });

    return fileData;
  }

  async getFileById(id: number): Promise<IFile | null> {
    return await this.fileRepository.findById(id);
  }

  async getFilesList(
    userId: string,
    page: number,
    listSize: number
  ): Promise<{
    files: IFile[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { files, total } = await this.fileRepository.findByUserId(
      userId,
      page,
      listSize
    );
    const totalPages = Math.ceil(total / listSize);

    return {
      files,
      total,
      page,
      totalPages,
    };
  }

  async downloadFile(id: number): Promise<{ file: IFile; stream: any }> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new Error("Файл не найден");
    }

    try {
      await fs.access(file.path);
    } catch {
      throw new Error("Файл не найден на диске");
    }

    const stream = fsSync.createReadStream(file.path);
    return { file, stream };
  }

  async updateFile(id: number, file: Express.Multer.File): Promise<IFile> {
    if (!file) {
      throw new Error("Файл является обязательным");
    }

    const existingFile = await this.fileRepository.findById(id);
    if (!existingFile) {
      throw new Error("Файл не найден");
    }

    try {
      await fs.unlink(existingFile.path);
    } catch (error) {}

    const fileExtension = path.extname(file.originalname).slice(1);
    const fileName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );

    const updatedFile = await this.fileRepository.update(id, {
      name: fileName,
      extension: fileExtension,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    });

    return updatedFile;
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new Error("Файл не найден");
    }

    try {
      await fs.unlink(file.path);
    } catch (error) {}

    await this.fileRepository.delete(id);
  }
}
