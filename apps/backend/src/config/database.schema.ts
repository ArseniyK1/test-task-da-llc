import mysql from "mysql2/promise";

export const initializeDatabase = async (pool: mysql.Pool) => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      accessToken TEXT NOT NULL,
      refreshToken TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      revoked BOOLEAN DEFAULT FALSE,
      INDEX idx_userId (userId),
      INDEX idx_refreshToken (refreshToken(255)),
      INDEX idx_accessToken (accessToken(255)),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      extension VARCHAR(50) NOT NULL,
      mimeType VARCHAR(100) NOT NULL,
      size BIGINT NOT NULL,
      path VARCHAR(500) NOT NULL,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_userId (userId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};
