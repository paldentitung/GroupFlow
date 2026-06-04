export const getInitials = (firstName = "", lastName = "") => {
  const first = firstName.trim();
  const last = lastName.trim();

  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
};
