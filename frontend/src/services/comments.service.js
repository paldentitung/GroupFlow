import request from "./api";

export const getComments = async (taskId) => {
  return request(`/comments/${taskId}/comments`);
};
export const addComments = async (taskId, content) => {
  return request(
    `/comments/${taskId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }), // ← wrap in object
    },
    true,
  );
};
