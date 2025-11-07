import axios from "axios";

// L’URL de ton backend Flask
const API_URL = "http://localhost:5000/api/user";

export const ApiService = {
  // Création d'utilisateur
  CreateUser: async (body) => {
    const response = await axios.post(`${API_URL}/create`, body);
    return response.data;
  },

  // Connexion
  LoginUser: async (body) => {
    const response = await axios.post(`${API_URL}/login`, body);
    return response.data;
  },

  // Réinitialiser mot de passe
  SaveNewPassword: async (body) => {
    const response = await axios.post(`${API_URL}/save_new_password/${body}`);
    return response.data;
  },
};
