import { updateUserProfileService } from "./users.service.js";

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
