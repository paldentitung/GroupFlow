// inside dateUtils.js or a new avatarUtils.js
export const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};
