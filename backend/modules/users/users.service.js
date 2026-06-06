import AppError from "../../utils/AppError.js";
import User from "./User.js";
import fs from "fs";
import path from "path";

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

  return {
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
    avatar: updatedUser.avatar,
  };
};

export const changeAvatarService = async (userId, avatar) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  );
  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }
  return updatedUser;
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

  return updatedUser;
};
