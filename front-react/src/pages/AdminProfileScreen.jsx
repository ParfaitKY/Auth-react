import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../services/user/userService";

const AdminProfileScreen = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (uid) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(uid);
      alert("Utilisateur supprimé !");
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="admin-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Admin Dashboard</h3>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Déconnexion</button>
        </div>

        {loading ? (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" />
            <span>Chargement des utilisateurs...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="alert alert-info">Aucun utilisateur trouvé.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Création</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.uid}>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge-role ${u.role === 'admin' ? 'admin' : 'user'}`}>{u.role}</span>
                    </td>
                    <td>{u.creation_date}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(u.uid)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileScreen;
