import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

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
