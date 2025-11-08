import axios from "axios";

const API_URL = "http://localhost:5000";

export const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}/api/user/readall`);
  return res.data?.users ?? [];
};

export const deleteUser = async (uid: string) => {
  const res = await axios.post(`${API_URL}/api/user/delete`, { uid });
  return res.data;
};
