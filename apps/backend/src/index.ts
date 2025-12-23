import dotenv from "dotenv";
import path from "path";
import { createApp } from "./app";
import { createDatabaseConnection } from "./config";
import { initializeDatabase } from "./config/database.schema";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const pool = await createDatabaseConnection();
    await initializeDatabase(pool);
    console.log("Database initialized");

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
