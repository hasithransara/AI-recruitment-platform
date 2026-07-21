import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/Profile/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/Profile/me", profileData);
  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/Profile/upload-resume",
    formData
  );

  return response.data;
};