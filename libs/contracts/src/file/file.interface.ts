export interface IFile {
  id: number;
  userId: string;
  name: string;
  extension: string;
  mimeType: string;
  size: number;
  path: string;
  uploadDate: Date;
}
