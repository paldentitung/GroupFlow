import AppError from "../../utils/AppError.js";
import User from "./User.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { userResponseMapper } from "./userResponseMapper.js";

export const getMeService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User no longer exists", 404); // ← this is your error
  }

  return userResponseMapper(user);
};

export const updateUserProfileService = async (
  userId,
  { firstName, lastName, bio, phone },
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName, bio, phone },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return userResponseMapper(updatedUser);
};

export const changeAvatarService = async (userId, avatarUrl) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true, runValidators: true },
  );
  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }
  return userResponseMapper(updatedUser);
};

export const removeAvatarService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.avatar) {
    return user;
  }

  const filePath = path.join(process.cwd(), user.avatar);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Failed to delete avatar file:", err.message);
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: null },
    { new: true },
  );

  return userResponseMapper(updatedUser);
};

export const changePasswordService = async (
  userId,
  { password, newPassword },
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return {
    message: "Password updated successfully",
  };
};
