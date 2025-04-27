// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  try {
    // 1) Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // 2) Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3) Create user with only expected fields
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // 4) Return sanitized user object
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("🔥 registerUser error:", error.stack || error.message);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `Access denied. You are logged in as a ${user.role}.`
      });
    }

    const accessToken = user.generateAuthToken();
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      role: user.role,
    });
  } catch (error) {
    console.error("🔥 loginUser error:", error.stack || error.message);
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Refresh the access token
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const accessToken = user.generateAuthToken();

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("🔥 refreshToken error:", error.stack || error.message);
    return res.status(400).json({ message: "Invalid or expired refresh token", error: error.message });
  }
};
