import db from "../config/db.js";

export const createUser = async (
  username,
  email,
  hashedPassword,
  profileImage,
  token,
  fullName
) => {
  const query = `
  INSERT INTO users (fullName, username, email, password, token, profile_image)
  VALUES (?, ?, ?, ?, ?, ?)
`;

  const [result] = await db.query(query, [
    username,
    fullName,
    email,
    hashedPassword,
    token,
    profileImage,
  ]);
  return result;
};

export const findUserByUserName = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};
