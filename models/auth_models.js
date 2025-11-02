import { db } from "../config/db_connection.js";

export const createUser = (username, email, hashedPassword, profileImage) => {
  const query = `
    INSERT INTO users (username, email, password, profile_image)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [username, email, hashedPassword, profileImage]);
};

export const findUserByUserName = (username) => {
  db.query("SELECT * FROM users WHERE username = ?", [username]);
};
