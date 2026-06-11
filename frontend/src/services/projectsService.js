import request from "./api";

export const getProjects = async () => {
  return request("/projects", {}, true);
};

export const createProject = async (projectData) => {
  return request(
    "/projects",
    {
      method: "POST",
      body: JSON.stringify(projectData),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};

export const deleteProject = async (projectId) => {
  return request(
    `/projects/${projectId}`,
    {
      method: "DELETE",
    },
    true,
  );
};

export const updateProject = async (projectId, updateData) => {
  return request(
    `/projects/${projectId}`,
    {
      method: "put",
      body: JSON.stringify(updateData),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};
