import api from "../api/axios";

export const getAdminDashboard = async () => {
  const response = await api.get("/Admin/dashboard");
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get("/Admin/users");
  return response.data;
};

export const updateAdminUserRole = async (
  userId,
  role
) => {
  const response = await api.put(
    `/Admin/users/${userId}/role`,
    { role }
  );

  return response.data;
};

export const updateAdminUserStatus = async (
  userId,
  isActive
) => {
  const response = await api.put(
    `/Admin/users/${userId}/status`,
    { isActive }
  );

  return response.data;
};

export const getAdminJobs = async () => {
  const response = await api.get("/Admin/jobs");
  return response.data;
};

export const updateAdminJobStatus = async (
  jobId,
  status
) => {
  const isActive = status === "Active";

  const response = await api.put(
    `/Admin/jobs/${jobId}/status`,
    {
      isActive,
    }
  );

  return response.data;
};

export const deleteAdminJob = async (jobId) => {
  const response = await api.delete(
    `/Admin/jobs/${jobId}`
  );

  return response.data;
};

export const getAdminReports = async () => {
  const response = await api.get("/Admin/reports");
  return response.data;
};