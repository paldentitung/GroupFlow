import request from "./api";

export const getMe = async () => {
  return request("/users/me", {}, true);
};

export const updateProfile = async (profileData) => {
  return request("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
};
