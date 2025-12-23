import { ITokenRepository } from "@test-task/contracts";
import mysql from "mysql2/promise";
import { getDatabasePool } from "../config";

export class AuthRepository implements ITokenRepository {
  private getPool(): mysql.Pool {
    return getDatabasePool();
  }

  async saveTokenPair(
    userId: string,
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    const pool = this.getPool();
    await pool.execute(
      "INSERT INTO tokens (userId, accessToken, refreshToken) VALUES (?, ?, ?)",
      [userId, accessToken, refreshToken]
    );
  }

  async findByRefreshToken(
    refreshToken: string
  ): Promise<{ userId: string; accessToken: string } | null> {
    const pool = this.getPool();
    const [rows] = await pool.execute<any[]>(
      "SELECT userId, accessToken FROM tokens WHERE refreshToken = ? AND revoked = FALSE",
      [refreshToken]
    );
    return rows[0] || null;
  }

  async findByAccessToken(
    accessToken: string
  ): Promise<{ userId: string } | null> {
    const pool = this.getPool();
    const [rows] = await pool.execute<any[]>(
      "SELECT userId FROM tokens WHERE accessToken = ? AND revoked = FALSE",
      [accessToken]
    );
    return rows[0] || null;
  }

  async revokeTokenPair(accessToken: string): Promise<void> {
    const pool = this.getPool();
    await pool.execute(
      "UPDATE tokens SET revoked = TRUE WHERE accessToken = ?",
      [accessToken]
    );
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const pool = this.getPool();
    await pool.execute("UPDATE tokens SET revoked = TRUE WHERE userId = ?", [
      userId,
    ]);
  }
}
