// src/services/auth/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:5000";
const USER_API_URL = "http://localhost:5000/api/user";

export const ApiService = {
  RegisterUser: async (body) => {
    const response = await axios.post(`${API_URL}/api/user/register`, body);
    return response.data;
  },

  LoginUser: async (body) => {
    const response = await axios.post(`${USER_API_URL}/login`, body);
    return response.data;
  },

  SaveNewPassword: async (body) => {
    const response = await axios.post(`${USER_API_URL}/save_new_password`, body);
    return response.data;
  },

  ResetPassword: async (body) => {
    const response = await axios.post(`${USER_API_URL}/save_new_password`, body);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get(`${USER_API_URL}/readall`);
    return response.data.users;
  },

  deleteUser: async (uid) => {
    const response = await axios.delete(`${USER_API_URL}/delete`, { data: { uid } });
    return response.data;
  },
};
