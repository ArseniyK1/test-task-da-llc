import { IFile, IFileRepository } from "@test-task/contracts";
import mysql from "mysql2/promise";
import { getDatabasePool } from "../config";

export class FileRepository implements IFileRepository {
  private getPool(): mysql.Pool {
    return getDatabasePool();
  }

  async create(file: Omit<IFile, "id" | "uploadDate">): Promise<IFile> {
    const pool = this.getPool();
    await pool.execute(
      "INSERT INTO files (userId, name, extension, mimeType, size, path) VALUES (?, ?, ?, ?, ?, ?)",
      [
        file.userId,
        file.name,
        file.extension,
        file.mimeType,
        file.size,
        file.path,
      ]
    );
    const [rows] = await pool.execute(
      "SELECT * FROM files WHERE userId = ? AND path = ? ORDER BY id DESC LIMIT 1",
      [file.userId, file.path]
    );
    return (rows as IFile[])[0];
  }

  async findById(id: number): Promise<IFile | null> {
    const pool = this.getPool();
    const [rows] = await pool.execute("SELECT * FROM files WHERE id = ?", [id]);
    return (rows as IFile[])[0] || null;
  }

  async findByUserId(
    userId: string,
    page: number,
    listSize: number
  ): Promise<{ files: IFile[]; total: number }> {
    const pool = this.getPool();
    const offset = (page - 1) * listSize;

    const limitValue = parseInt(String(listSize), 10);
    const offsetValue = parseInt(String(offset), 10);

    const [countRows] = await pool.execute<any[]>(
      "SELECT COUNT(*) as total FROM files WHERE userId = ?",
      [userId]
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT * FROM files WHERE userId = ? ORDER BY uploadDate DESC LIMIT ${limitValue} OFFSET ${offsetValue}`,
      [userId]
    );

    return { files: rows as IFile[], total };
  }

  async update(
    id: number,
    file: Omit<IFile, "id" | "uploadDate" | "userId">
  ): Promise<IFile> {
    const pool = this.getPool();
    await pool.execute(
      "UPDATE files SET name = ?, extension = ?, mimeType = ?, size = ?, path = ? WHERE id = ?",
      [file.name, file.extension, file.mimeType, file.size, file.path, id]
    );
    const [rows] = await pool.execute("SELECT * FROM files WHERE id = ?", [id]);
    return (rows as IFile[])[0];
  }

  async delete(id: number): Promise<void> {
    const pool = this.getPool();
    await pool.execute("DELETE FROM files WHERE id = ?", [id]);
  }
}
