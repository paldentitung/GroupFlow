import request from "./api";

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
    `/members/${projectId}/member/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
    true,
  );
};
