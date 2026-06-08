import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../users/User.js";
import AppError from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
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
  console.log("Sending email to:", newUser.email);
  await sendEmail({
    to: newUser.email,
    subject: "Verify your email",
    html: `Please verify your email by clicking the following link: ${verificationUrl}`,
  });

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

  if (!user) throw new AppError("Invalid or expired verification token", 400);
  if (user.isEmailVerified) throw new AppError("Email already verified", 400);
  if (user.verificationTokenExpires < new Date())
    throw new AppError("Token expired, request a new one", 400);

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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) throw new AppError("No account with that email", 404);

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60); // 1hr
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `Click to reset your password: <a href="${resetUrl}">${resetUrl}</a>. Expires in 1 hour.`,
  });

  return { success: true, message: "Reset email sent" };
};

export const resetPasswordService = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) throw new AppError("Invalid or expired reset token", 400);

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { success: true, message: "Password reset successfully" };
};
