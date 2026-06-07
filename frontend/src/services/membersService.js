import request from "./api";

export const getMembers = async (projectId) => {
  return request(`/members/${projectId}/members`, {}, true);
};

export const inviteMember = async (projectId, email, role) => {
  return request(
    `/members/${projectId}/member/invite`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    },
    true,
  );
};

export const acceptInvite = async (projectId, token) => {
  return request(
    `/members/${projectId}/member/accept/${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};
