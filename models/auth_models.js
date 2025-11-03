export const createUser = async (
  username,
  email,
  hashedPassword,
  profileImage,
  token,
) => {
  const query = `
    INSERT INTO users (username, email, password, token, profile_image)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [
    username,
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
