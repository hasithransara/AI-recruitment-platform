import api from "../api/axios";

export const getRecruiterAnalytics = async () => {
  const response = await api.get(
    "/Dashboard/recruiter/analytics"
  );

  return response.data;
};