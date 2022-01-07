import { Router, Request, Response } from "express";
import pool from "../config/db/db";

export const calendarRouter = Router();

// Fetching curr month data for the user
calendarRouter.post("/month", async (req: Request, res: Response) => {
  try {
    const monthData = await pool.query(
      `SELECT day, month, year, user_id, daytoggle, message FROM calendar
       WHERE month = $1 AND year = $2 AND user_id = $3
      `,
      [req.body.month, req.body.year, req.body.user_id]
    );
    res.json(monthData.rows);
  } catch (error) {
    res.json({ message: "Error occured" });
  }
});

// Fetching data of all non-admin users for selected day
calendarRouter.post("/day-report", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      const dayReport = await pool.query(
        `SELECT user_id, daytoggle, message FROM calendar
       WHERE day = $1 AND month = $2 AND year = $3`,
        [req.body.day, req.body.month, req.body.year]
      );
      res.json(dayReport.rows);
    } catch (error) {
      res.json({ message: "Error occured" });
    }
  } else {
    res.json({ message: "Not Authenticated" });
  }
});

// Add new message/toggle to the db
calendarRouter.post("/add", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      await pool.query(
        `INSERT INTO calendar (id, user_id, day, month, year, daytoggle, message)
			VALUES ($1, $2, $3, $4, $5, $6, $7) 
			ON CONFLICT (id) DO UPDATE
			SET daytoggle = excluded.daytoggle, message = excluded.message`,
        [
          req.body.id,
          req.body.user_id,
          req.body.day,
          req.body.month,
          req.body.year,
          req.body.daytoggle,
          req.body.message,
        ]
      );
      res.json({ message: "transfer successful" });
    } catch (error) {
      res.json({ message: "There was an error" });
    }
  } else {
    res.json([{ message: "Not Authenticated" }]);
  }
});
