import request from "./api";

export const getTasks = async (projectId) => {
  return request(`/tasks/${projectId}/tasks`, {}, true);
};

export const getTaskById = async (taskId) => {
  return request(`/tasks/task/${taskId}`, {}, true);
};

export const createTask = async (projectId, taskData) => {
  return request(
    `/tasks/${projectId}/tasks`,
    {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};

export const updateTask = async (taskId, taskData) => {
  return request(
    `/tasks/${taskId}`,
    {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};

export const deleteTask = async (taskId) => {
  return request(
    `/tasks/${taskId}`,
    {
      method: "DELETE",
    },
    true,
  );
};
