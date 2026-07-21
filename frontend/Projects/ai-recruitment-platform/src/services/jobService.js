import api from "../api/axios";

export const getJobs = async () => {
  const response = await api.get("/Jobs");
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/Jobs/${id}`);
  return response.data;
};

export const createJob = async (job) => {
  const response = await api.post("/Jobs", job);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await api.put(`/Jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/Jobs/${id}`);
  return response.data;
};