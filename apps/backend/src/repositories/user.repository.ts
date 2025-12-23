import { IUser, IUserRepository } from "@test-task/contracts";
import mysql from "mysql2/promise";
import { getDatabasePool } from "../config";

export class UserRepository implements IUserRepository {
  private getPool(): mysql.Pool {
    return getDatabasePool();
  }

  async create(user: Omit<IUser, "createdAt">): Promise<IUser> {
    const pool = this.getPool();
    await pool.execute("INSERT INTO users (id, password) VALUES (?, ?)", [
      user.id,
      user.password,
    ]);
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      user.id,
    ]);
    return (rows as IUser[])[0];
  }

  async findById(id: string): Promise<IUser | null> {
    const pool = this.getPool();
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return (rows as IUser[])[0] || null;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    const pool = this.getPool();
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
      password,
      id,
    ]);
  }

  async delete(id: string): Promise<void> {
    const pool = this.getPool();
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  }
}
