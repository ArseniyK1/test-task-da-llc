import { IFile, IFileService } from "@test-task/contracts";
import { FileRepository } from "../repositories";

export class FileService implements IFileService {
  constructor(private fileRepository: FileRepository) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<IFile> {
    throw new Error("Not implemented");
  }

  async getFileById(id: number): Promise<IFile | null> {
    throw new Error("Not implemented");
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
    throw new Error("Not implemented");
  }

  async downloadFile(id: number): Promise<{ file: IFile; stream: any }> {
    throw new Error("Not implemented");
  }

  async updateFile(id: number, file: Express.Multer.File): Promise<IFile> {
    throw new Error("Not implemented");
  }

  async deleteFile(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}
