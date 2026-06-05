import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.post("/init", async (_req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
        name TEXT NOT NULL,
        amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
        date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    res.json({
      status: "ok",
      message: "Transactions table is ready",
    });
  } catch (error) {
    console.error("Failed to initialize transactions table:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to initialize transactions table",
    });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        type,
        name,
        amount,
        date,
        created_at
      FROM transactions
      ORDER BY date DESC, created_at DESC;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch transactions",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { type, name, amount, date } = req.body;

    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({
        status: "error",
        message: "Transaction type must be income or expense",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Name is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be greater than 0",
      });
    }

    if (!date) {
      return res.status(400).json({
        status: "error",
        message: "Date is required",
      });
    }

    const result = await db.query(
      `
        INSERT INTO transactions (type, name, amount, date)
        VALUES ($1, $2, $3, $4)
        RETURNING id, type, name, amount, date, created_at;
      `,
      [type, name.trim(), Number(amount), date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to create transaction:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create transaction",
    });
  }
});

export default router;