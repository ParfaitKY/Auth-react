import axios from "axios";
import { IUser } from "../auth/authService";

const API_URL = "http://localhost:5000";

export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await axios.get(`${API_URL}/api/user/all`);
  return res.data.users;
};

export const deleteUser = async (uid: string) => {
  const res = await axios.delete(`${API_URL}/api/user/delete`, { data: { uid } });
  return res.data;
};
