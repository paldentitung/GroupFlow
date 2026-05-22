import User from "../models/User.js";
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

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
