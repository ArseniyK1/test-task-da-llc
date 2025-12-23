import { IFile } from "./file.interface";

export interface IFileService {
  uploadFile(userId: string, file: Express.Multer.File): Promise<IFile>;
  getFileById(id: number): Promise<IFile | null>;
  getFilesList(
    userId: string,
    page: number,
    listSize: number
  ): Promise<{
    files: IFile[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  downloadFile(id: number): Promise<{ file: IFile; stream: any }>;
  updateFile(id: number, file: Express.Multer.File): Promise<IFile>;
  deleteFile(id: number): Promise<void>;
}
