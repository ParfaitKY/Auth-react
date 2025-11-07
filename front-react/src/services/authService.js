const API_URL = "http://localhost:5000"; // ⚠️ adapte à ton backend

// Login
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Erreur de connexion");
  return data.user_infos; // { uid, email, role, creation_date }
};

// Register
export const register = async ({ email, password, confirmpassword, motpreferer, role }) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, confirmpassword, motpreferer, role }),
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || data.error_description || "Erreur inscription");
  return data.user_infos; // { uid, email, role, creation_date }
};

// Reset password
export const resetPassword = async ({ email, motpreferer, newpassword, confirmpassword }) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motpreferer, newpassword, confirmpassword }),
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Erreur réinitialisation");
  return data.message; // Message succès
};

// Get all users (admin)
export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.motif || data.error_description || "Erreur récupération utilisateurs");
  return data.users; // Array d'utilisateurs
};

// Delete user (admin)
export const deleteUser = async (uid) => {
  const res = await fetch(`${API_URL}/delete-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || data.error_description || "Erreur suppression utilisateur");
  return true;
};
