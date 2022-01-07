import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import pool from "../db/db";
import * as argon2 from "argon2";
import { User } from "../../utils/interfaces";

function initialize(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        let user = await pool.query("SELECT * FROM users WHERE username = $1", [
          username,
        ]);
        let userInfo: string | undefined = user.rows[0];
        if (!userInfo) {
          return done(null, false);
        }
        const isValid = await argon2.verify(user.rows[0].password, password);
        if (isValid) {
          return done(null, {
            id: user.rows[0].id,
            username: user.rows[0].username,
            role: user.rows[0].role,
          });
        } else {
          return done(null, false);
        }
      } catch (error) {
        done(error);
      }
    })
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((userId: string, done) => {
    pool
      .query("SELECT id, username, role FROM users WHERE id = $1", [userId])
      .then((user) => {
        done(null, {
          id: <string>user.rows[0].id,
          username: <string>user.rows[0].username,
          role: <string>user.rows[0].role,
        });
      })
      .catch((err) => done(err));
  });
}

export default initialize;
