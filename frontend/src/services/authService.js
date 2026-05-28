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
    false,
  );
};

export const verifyEmail = async (token) => {
  return request(
    "/auth/verify-email",
    {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    },
    false,
  );
};
