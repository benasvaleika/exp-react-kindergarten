import { Router, Request, Response } from "express";
import passport from "passport";
import pool from "../config/db/db";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export const loginRouter = Router();
export const registerRouter = Router();
export const logoutRouter = Router();
export const authenticatedRouter = Router();
export const changePasswordRouter = Router();
export const deleteRouter = Router();

// Checks if authenticated
authenticatedRouter.get("/", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = await pool.query(
      `SELECT id, username, role, diet FROM users WHERE id = '${req.session.passport.user}'`
    );
    const message = { message: "Authenticated" };
    res.json([{ ...user.rows[0], ...message }]);
  } else {
    res.json([{ message: "Not Authenticated" }]);
  }
});

// Register
registerRouter.post("/", async (req: Request, res: Response) => {
  if (req.user?.role === "admin") {
    try {
      const hashedPassword: string = await argon2.hash(req.body.password);
      let userRole = "user";
      if (req.body.role === true) {
        userRole = "admin";
      }
      await pool.query(
        "INSERT INTO users (id, username, password, role) VALUES($1,$2,$3,$4)",
        [uuidv4(), req.body.username, hashedPassword, userRole]
      );
      res.json({ message: "User Added Successfuly." });
    } catch (error) {
      if (error.code === "23505") {
        res.json({ message: "User already exists" });
      }
    }
  } else {
    res.json({ message: "Please log in as administrator" });
  }
});

// Login
loginRouter.post(
  "/",
  passport.authenticate("local", {}),
  (req: Request, res: Response) => {
    try {
      if (req.user) {
        res.json({ message: "Authentication successful" });
      } else {
        res.json({ message: "Authentication failed" });
      }
    } catch (error) {
      res.json({ message: "Error occurred" });
    }
  }
);

// Logout
logoutRouter.get("/", (req: Request, res: Response) => {
  req.logout();
  res.json({ message: "Logged out" });
});

// Change Password
changePasswordRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.session.passport.user,
    ]);
    const isValid = await argon2.verify(
      user.rows[0].password,
      req.body.oldPassword
    );
    if (isValid) {
      const newPasswordHash = await argon2.hash(req.body.newPassword);
      await pool.query(
        `UPDATE users SET password = $1 
      WHERE id = $2`,
        [newPasswordHash, req.session.passport.user]
      );
      res.json({ message: "Password changed successfuly" });
    } else {
      res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.send(error);
  }
});

// Delete User
deleteRouter.post("/", async (req: Request, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      await pool.query(`DELETE FROM users WHERE id = $1`, [req.body.id]);
      res.json({ message: "User deleted successully" });
    } else {
      res.json({ message: "Please log in as administrator" });
    }
  } catch (error) {
    res.json({ message: "Error occurred" });
  }
});
