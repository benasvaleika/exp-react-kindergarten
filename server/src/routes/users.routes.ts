import { Router, Request, Response } from "express";
import pool from "../config/db/db";

export const usersRouter = Router();

// Get all users with 'user' role
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      const users = await pool.query(
        `SELECT id, username, diet FROM users WHERE role = 'user'`
      );
      res.json(users.rows);
    } else {
      res.json({ message: "Please log in as administrator" });
    }
  } catch (error) {
    res.json({ message: "Error occured" });
  }
});

// Get all users
usersRouter.get("/all", async (req: Request, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      const users = await pool.query(`SELECT id, username, diet, role
      FROM users`);
      res.json(users.rows);
    }
  } catch (error) {
    res.json({ message: "Error occured" });
  }
});

// Change user diet
usersRouter.post("/diet", async (req: Request, res: Response) => {
  try {
    const change = await pool.query(
      `UPDATE users
    SET diet = $1 WHERE id = $2`,
      [req.body.diet, req.user?.id]
    );
    console.log(change);
    res.json({ message: "Operation successful" });
  } catch (error) {
    res.json({ message: "Error occured" });
  }
});
