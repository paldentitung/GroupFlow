import request from "./api";

export const register = async (data) => {
  return request(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
    false,
  );
};

export const login = async (data) => {
  return request(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
    true,
  );
};

export const verifyEmail = async (token) => {
  return request(
    `/auth/verify-email/${token}`,
    {
      method: "GET",
    },
    false,
  );
};

export const logout = async () => {
  return request(
    "/auth/logout",
    {
      method: "POST",
    },
    false,
  );
};

export const forgotPassword = async (email) => {
  return request("/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token, newPassword) => {
  return request(`/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword }),
  });
};
