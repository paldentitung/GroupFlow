import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Remove password from response
  const userResponse = newUser.toObject();
  delete userResponse.password;

  // Send response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: userResponse,
  });
};
