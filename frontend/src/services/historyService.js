import request from "./api";

export const getUserHistory = async () => {
  return request(`/history/user-history`, {}, true);
};
