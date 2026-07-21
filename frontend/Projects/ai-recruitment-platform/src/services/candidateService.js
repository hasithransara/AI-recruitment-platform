import axios from "axios";

const API =
  "https://localhost:7110/api/Candidate";

export const getCandidateDashboard =
  async () => {
    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API}/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };