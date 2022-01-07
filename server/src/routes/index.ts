import { Router, Request, Response } from "express";
import {
  authenticatedRouter,
  changePasswordRouter,
  deleteRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
} from "./authentication.routes";
import { calendarRouter } from "./calendar.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/register", registerRouter);
routes.use("/logout", logoutRouter);
routes.use("/authenticated", authenticatedRouter);
routes.use("/calendar", calendarRouter);
routes.use("/users", usersRouter);
routes.use("/change-password", changePasswordRouter);
routes.use("/delete", deleteRouter);

export default routes;
