import api from "../api/axios";

export const getRecruiterDashboard = async () => {
  const response = await api.get("/Dashboard/recruiter");
  return response.data;
};