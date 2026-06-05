import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "myfinance-backend",
  });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      status: "ok",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});