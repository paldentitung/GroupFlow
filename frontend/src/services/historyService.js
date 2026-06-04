import request from "./api";

export const getUserHistory = async (page, limit) => {
  return request(`/history/user-history?page=${page}&limit=${limit}`, {}, true);
};
