export const createUser = async (
  username,
  email,
  hashedPassword,
  profileImage,
) => {
  const query = `
    INSERT INTO users (username, email, password, profile_image)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [
    username,
    email,
    hashedPassword,
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
