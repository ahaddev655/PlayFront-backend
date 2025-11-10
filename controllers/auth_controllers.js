import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { createUser, findUserByUserName } from "../models/auth_models.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // ✅ Check if user already exists
    const user = await findUserByUserName(username);
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
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

    // ✅ Create user
    await createUser(username, email, hashedPassword, profileImageUrl, token, fullName);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error", error: error });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { email, fullName, profileImage } = req.body;

    // Username from email (before @)
    const username = email.split("@")[0];

    // Check if user exists
    let user = await findUserByUserName(username);

    if (!user) {
      // Dummy password (hashed)
      const dummyPassword = await bcrypt.hash("google_dummy_password", 10);

      // Generate token
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      // Create new user
      await createUser(
        username,
        email,
        dummyPassword,
        profileImage || null,
        token,
        fullName
      );

      return res.status(201).json({
        success: true,
        message: "Google signup successful",
        token,
      });
    }

    // If user already exists — just sign in
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
    });

  } catch (error) {
    console.error("Google Auth error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
