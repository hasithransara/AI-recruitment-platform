import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7110/api", // Change to your backend port
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getDashboard = () =>
  API.get("/HiringManager/dashboard");

export const getCandidates = () =>
  API.get("/HiringManager/candidates");

export const getCandidate = (applicationId) =>
  API.get(`/HiringManager/candidates/${applicationId}`);

export const createFeedback = (data) =>
  API.post("/HiringManager/feedback", data);

export const updateFeedback = (applicationId, data) =>
  API.put(`/HiringManager/feedback/${applicationId}`, data);

export const updateDecision = (applicationId, decision) =>
  API.put(`/HiringManager/decisions/${applicationId}`, {
    decision,
  });