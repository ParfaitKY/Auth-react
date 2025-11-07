import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import adminService from "../services/adminService";

const AdminProfileScreen = () => {
  const { user: adminUser } = useContext(AuthContext);

  // États de gestion
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // 🔹 1. Récupérer la liste des utilisateurs
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setMessage(null);

    const result = await adminService.getAllUsers();
    if (result.success && result.users) {
      setUsers(result.users);
    } else {
      setMessage(result.message || "Erreur lors du chargement des utilisateurs.");
      setUsers([]);
    }

    setLoading(false);
  }, []);

  // 🔹 Appel automatique au montage
  useEffect(() => {
    if (adminUser?.role === "admin") {
      fetchUsers();
    } else {
      setLoading(false);
      setMessage("Accès non autorisé.");
    }
  }, [adminUser, fetchUsers]);

  // 🔹 2. Supprimer un utilisateur
  const handleDelete = async (userId, userEmail) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${userEmail} ?`)) return;

    const result = await adminService.deleteUser(userId);
    if (result.success) {
      setMessage(`Utilisateur ${userEmail} supprimé avec succès.`);
      fetchUsers();
    } else {
      setMessage(result.message || "Échec de la suppression.");
    }
  };

  // 🔹 3. Changer le rôle d’un utilisateur
  const handleRoleChange = async (user) => {
    const newRole = user.role === "user" ? "admin" : "user";

    if (!window.confirm(`Changer le rôle de ${user.email} à ${newRole} ?`)) return;

    const result = await adminService.changeUserRole(user.id, newRole);
    if (result.success) {
      setMessage(`Rôle de ${user.email} changé à ${newRole}.`);
      fetchUsers();
    } else {
      setMessage(result.message || "Échec du changement de rôle.");
    }
  };

  // 🔹 4. Affichage pendant le chargement
  if (loading) {
    return <div className="text-center mt-5">Chargement des utilisateurs...</div>;
  }

  // 🔹 5. Affichage principal
  return (
    <div className="text-center mt-5">
      <h2>
        Admin : <strong>{adminUser?.email}</strong>
      </h2>
      <h3 className="mb-4">Gestion des Utilisateurs</h3>

      {message && (
        <div
          className={`alert ${
            message.includes("succès") ? "alert-success" : "alert-danger"
          } w-50 mx-auto mb-3`}
          role="alert"
        >
          {message}
        </div>
      )}

      <ul className="list-group w-75 mx-auto">
        {users.length === 0 && !loading && (
          <li className="list-group-item">Aucun utilisateur trouvé.</li>
        )}

        {users.map((u) => (
          <li
            key={u.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{u.email}</strong>
              <span
                className={`badge rounded-pill ms-3 ${
                  u.role === "admin" ? "bg-primary" : "bg-secondary"
                }`}
              >
                {u.role.toUpperCase()}
              </span>
            </div>

            <div>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => handleRoleChange(u)}
                disabled={u.id === adminUser?.id}
              >
                Passer à <strong>{u.role === "user" ? "Admin" : "User"}</strong>
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(u.id, u.email)}
                disabled={u.id === adminUser?.id}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProfileScreen;
