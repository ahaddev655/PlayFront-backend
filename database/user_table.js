import db from "../config/db.js";

const createUserTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
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

    await db.query(createTableQuery); // ✅ no callback, uses async/await
    console.log("✅ Users table created or already exists.");
  } catch (err) {
    console.error("❌ Error creating users table:", err.message);
  }
};

export default createUserTable;
