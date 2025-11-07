import axios from "axios";

const API_URL = "http://localhost:5000";

export interface IUser {
  uid?: string;
  email: string;
  role: "user" | "admin";
  creation_date?: string;
}

export const login = async (email: string, password: string): Promise<IUser> => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data.user_infos;
};

export const register = async (
  email: string,
  password: string,
  motpreferer: string,
  role: "user" | "admin"
): Promise<IUser> => {
  const res = await axios.post(`${API_URL}/register`, { email, password, motpreferer, role });
  return res.data.user_infos;
};

export const resetPassword = async (
  email: string,
  motpreferer: string,
  newpassword: string,
  confirmpassword: string
) => {
  const res = await axios.post(`${API_URL}/reset-password`, {
    email,
    motpreferer,
    newpassword,
    confirmpassword,
  });
  return res.data;
};
