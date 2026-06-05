import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.post("/init", async (_req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        target_amount NUMERIC(12, 2) NOT NULL CHECK (target_amount > 0),
        current_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    res.json({
      status: "ok",
      message: "Goals table is ready",
    });
  } catch (error) {
    console.error("Failed to initialize goals table:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to initialize goals table",
    });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        title,
        target_amount,
        current_amount,
        created_at
      FROM goals
      ORDER BY created_at DESC;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch goals:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch goals",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, targetAmount } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Goal title is required",
      });
    }

    if (!targetAmount || Number(targetAmount) <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Target amount must be greater than 0",
      });
    }

    const result = await db.query(
      `
        INSERT INTO goals (title, target_amount)
        VALUES ($1, $2)
        RETURNING id, title, target_amount, current_amount, created_at;
      `,
      [title.trim(), Number(targetAmount)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to create goal:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create goal",
    });
  }
});

export default router;