import { IFile } from "./file.interface";

export interface IFileRepository {
  create(file: Omit<IFile, "id" | "uploadDate">): Promise<IFile>;
  findById(id: number): Promise<IFile | null>;
  findByUserId(
    userId: string,
    page: number,
    listSize: number
  ): Promise<{ files: IFile[]; total: number }>;
  update(
    id: number,
    file: Omit<IFile, "id" | "uploadDate" | "userId">
  ): Promise<IFile>;
  delete(id: number): Promise<void>;
}
