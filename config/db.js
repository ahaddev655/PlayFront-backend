import mysql2 from "mysql2";
import dotenv from "dotenv";
import config from "./db.config.js";
dotenv.config();

const db = mysql2.createPool({
  host: config.db_host || "mysql-sa-blogs.alwaysdata.net",
  user: config.db_user || "sa-blogs",
  password: config.db_password || "3104944Tony",
  database: config.db_name || "sa-blogs_db_playfront",
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
