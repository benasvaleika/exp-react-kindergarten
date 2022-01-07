import express from "express";
import { config as dotenv } from "dotenv";
import pool from "./config/db/db";
import session from "express-session";
import pgSession from "connect-pg-simple";
import routes from "./routes";
import passport from "passport";
import initializePassport from "./config/passport/passportConfig";
import cors from "cors";

const app = express();
dotenv();

// Middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);

const pgSess = pgSession(session); // pgSession variable

// Session configuration
app.use(
  session({
    store: new pgSess({
      pool: pool,
    }),

    secret: <string>process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      domain: undefined,
    },
  })
);

// Passport Auth
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Routes //
app.use(routes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
