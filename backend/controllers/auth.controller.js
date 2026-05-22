import User from "../models/User.js";
import bcrypt from "bcrypt";
import { registerService } from "../services/auth.service.js";
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
