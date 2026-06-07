import request from "./api";

export const getComments = async (taskId) => {
  return request(`/comments/${taskId}/comments`);
};
