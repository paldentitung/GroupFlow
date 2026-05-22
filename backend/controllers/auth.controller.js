import User from "../models/User.js";
import {
  registerService,
  verifyEmailService,
} from "../services/auth.service.js";

export const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await registerService({
    firstName,
    lastName,
    email,
    password,
  });

  // Send response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const verifyEmailController = async (req, res) => {
  const { token } = req.params;

  const result = await verifyEmailService(token);

  res.status(200).json({
    success: result.success,
    message: result.message,
  });
};
