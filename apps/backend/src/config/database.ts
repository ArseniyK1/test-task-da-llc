import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export const createDatabaseConnection = async (): Promise<mysql.Pool> => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "test",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

export const getDatabasePool = (): mysql.Pool => {
  if (!pool) {
    throw new Error(
      "Database pool not initialized. Call createDatabaseConnection first."
    );
  }
  return pool;
};
