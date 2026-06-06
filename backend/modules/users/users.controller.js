import { success } from "zod";
import {
  updateUserProfileService,
  changeAvatarService,
  removeAvatarService,
  changePasswordService,
} from "./users.service.js";

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
  const avatar = req.file?.path;

  const result = await changeAvatarService(req.user._id, avatar);

  res.status(200).json({
    success: true,
    message: "Avatar changed",
  });
};

export const removeAvatarConroller = async (req, res) => {
  const result = await removeAvatarService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Avatar remove",
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
