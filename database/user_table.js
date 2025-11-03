import db from "../config/db.js";

const createUserTable = () => {
  const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255),
  cover_image VARCHAR(255),
  thumbnail_image VARCHAR(255),
  isApproved BOOLEAN DEFAULT FALSE,
  isBlocked BOOLEAN DEFAULT FALSE,
  role VARCHAR(255) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("❌ Error creating users table:", err.message);
    } else {
      console.log("✅ Users table created or already exists.");
    }
  });
};

export default createUserTable;
