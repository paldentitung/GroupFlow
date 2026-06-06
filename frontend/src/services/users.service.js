import request from "./api";

export const getMe = async () => {
  return request("/users/me", {}, true);
};
