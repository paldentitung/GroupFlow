import AppError from "../../utils/AppError.js";
import User from "./User.js";

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
