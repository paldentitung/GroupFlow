import request from "./api";

export const getTasks = async (projectId, page = 1, limit = 10) => {
  return request(
    `/tasks/${projectId}/tasks?page=${page}&limit=${limit}`,
    {},
    true,
  );
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

export const respondToTask = async (taskId, response) => {
  return request(
    `/tasks/${taskId}/respond`,
    {
      method: "PATCH",
      body: JSON.stringify({ response }),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};

export const getCurrentUserTasks = async (page, limit) => {
  const res = await request(
    `/tasks/my-tasks?page=${page}&limit=${limit}`,
    {},
    true,
  );

  return {
    tasks: res.data,
    pagination: res.pagination,
  };
};
