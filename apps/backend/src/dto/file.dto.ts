export class FileUploadDto {
  file!: Express.Multer.File;
}

export class FileListQueryDto {
  page?: number;
  list_size?: number;
}

export class FileResponseDto {
  id!: number;
  name!: string;
  extension!: string;
  mimeType?: string;
  size!: number;
  uploadDate?: Date;
}

export class FileListResponseDto {
  files?: FileResponseDto[];
  page?: number;
  totalPages?: number;
  total?: number;
}
