import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { createUser, findUserByUserName } from "../models/auth_models.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Validation
    if (!username || !email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      });
    }

    // Check if user already exists
    const user = findUserByUserName(username);
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Upload profile image to Cloudinary
    let profileImageUrl = null;
    if (req.file?.path) {
      profileImageUrl = await uploadToCloudinary(req.file.path);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // Create user
    createUser(
      username,
      email,
      hashedPassword,
      profileImageUrl,
      token,
      (err) => {
        if (err) {
          console.error("Error creating user:", err);
          return res
            .status(500)
            .json({ success: false, error: "User creation failed" });
        }

        res.status(201).json({
          success: true,
          message: "User registered successfully",
          token,
        });
      },
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
