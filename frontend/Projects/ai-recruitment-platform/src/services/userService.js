import axios from "axios";

const API = "https://localhost:7110/api/User";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};