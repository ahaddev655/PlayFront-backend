import mysql2 from "mysql2";
import dotenv from "dotenv";
import config from "./db.config.js";
dotenv.config();

const db = mysql2.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
    connection.release();
  }
});

export default db;
