import api from "../api/axios";

export const login = async (email, password) => {
  const response = await api.post("/Auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (user) => {
  const response = await api.post("/Auth/register", user);

  return response.data;
};