import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
export const registerService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60);

  const newUser = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpires,
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  console.log(verificationUrl);

  const userResponse = newUser.toObject();

  delete userResponse.password;
  delete userResponse.verificationToken;
  delete userResponse.verificationTokenExpires;

  return userResponse;
};

export const verifyEmailService = async (token) => {
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  user.isEmailVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;

  await user.save();

  return {
    success: true,
    message: "Email verified successfully",
  };
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isEmailVerified) {
    throw new AppError("Please verify your email before logging in", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    success: true,
    message: "Login successful",
    token,
    user: userResponse,
  };
};
