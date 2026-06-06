export const userResponseMapper = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    phone: user.phone,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};
