import {
  registerService,
  verifyEmailService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
} from "./auth.service.js";
import User from "../users/User.js";
export const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await registerService({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const verifyEmailController = async (req, res) => {
  const token = decodeURIComponent(req.params.token);

  const result = await verifyEmailService(token);

  res.status(200).json({
    success: result.success,
    message: result.message,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json({
    success: result.success,
    message: result.message,
    user: result.user,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "Logged out" });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);

  res.status(200).json(result);
};

export const resetPasswordController = async (req, res) => {
  const token = decodeURIComponent(req.params.token);
  const { newPassword } = req.body;

  const result = await resetPasswordService(token, newPassword);
  res.status(200).json(result);
};
