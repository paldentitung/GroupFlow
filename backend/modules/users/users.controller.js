import { success } from "zod";
import {
  updateUserProfileService,
  changeAvatarService,
  removeAvatarService,
  changePasswordService,
  getMeService,
} from "./users.service.js";

export const getMeController = async (req, res) => {
  const user = await getMeService(req.user._id);

  res.status(200).json({
    success: true,
    message: "User info retrieved",
    user,
  });
};

export const updateUserProfileController = async (req, res) => {
  const { firstName, lastName, bio, phone } = req.body;

  const result = await updateUserProfileService(req.user._id, {
    firstName,
    lastName,
    bio,
    phone,
  });

  res.status(200).json({
    success: true,
    message: "User Profile updated",
    data: result,
  });
};

export const changeAvatarConroller = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const avatarUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  const result = await changeAvatarService(req.user._id, avatarUrl);

  res.status(200).json({
    success: true,
    message: "Avatar changed",
    data: result,
  });
};
export const removeAvatarConroller = async (req, res) => {
  const result = await removeAvatarService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Avatar remove",
    data: result,
  });
};

export const changePasswordController = async (req, res) => {
  const { newPassword, password } = req.body;

  const result = await changePasswordService(req.user._id, {
    newPassword,
    password,
  });

  res.status(200).json({
    success: true,
    message: "Password change",
    data: result,
  });
};
