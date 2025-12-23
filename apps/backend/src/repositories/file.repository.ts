import { IFile, IFileRepository } from '@test-task/contracts';

export class FileRepository implements IFileRepository {
  async create(file: Omit<IFile, 'id' | 'uploadDate'>): Promise<IFile> {
    throw new Error('Not implemented');
  }

  async findById(id: number): Promise<IFile | null> {
    throw new Error('Not implemented');
  }

  async findByUserId(userId: string, page: number, listSize: number): Promise<{ files: IFile[]; total: number }> {
    throw new Error('Not implemented');
  }

  async update(id: number, file: Omit<IFile, 'id' | 'uploadDate' | 'userId'>): Promise<IFile> {
    throw new Error('Not implemented');
  }

  async delete(id: number): Promise<void> {
    throw new Error('Not implemented');
  }
}

