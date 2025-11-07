import api from "./api";

// Liste des utilisateurs (admin)
export const getUsers = async () => {
  const response = await api.get("/users");
  if (response.data.status === "success") return response.data.users;
  throw new Error(response.data.motif || "Erreur getUsers");
};

// Supprimer un utilisateur (admin)
export const deleteUser = async (uid: string) => {
  const response = await api.post("/delete-user", { uid });
  if (response.data.status === "success") return true;
  throw new Error(response.data.error_description || "Erreur deleteUser");
};
