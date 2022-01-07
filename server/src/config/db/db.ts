import { Pool } from "pg";
import { config as dotenv } from "dotenv";

dotenv();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // user: <string>process.env.DB_USER,
  // password: <string>process.env.DB_PASSWORD,
  // host: <string>process.env.DB_HOST,
  // port: <any>process.env.DB_PORT,
  // database: <string>process.env.DB_DATABASE,
});

export default pool;
