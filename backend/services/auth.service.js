import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const registerService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  // Validate fields
  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }
  // check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
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

  return userResponse;
};
