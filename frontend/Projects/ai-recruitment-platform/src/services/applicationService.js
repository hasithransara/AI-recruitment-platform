import api from "../api/axios";

export const applyForJob = async (jobId) => {
  const response = await api.post("/Applications", {
    jobId: Number(jobId),
  });

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/Applications/my");

  return response.data;
};

export const getApplicantsByJob = async (jobId) => {
  const response = await api.get(
    `/Applications/job/${jobId}`
  );

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await api.put(
    `/Applications/${applicationId}/status`,
    { status }
  );

  return response.data;
};