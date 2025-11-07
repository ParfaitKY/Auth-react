import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../services/authService";

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
    <div className="row justify-content-center mt-5">
      <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Admin Dashboard</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
        </div>

        {loading ? (
          <p>Chargement des utilisateurs...</p>
        ) : users.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
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
                  <td>{u.role}</td>
                  <td>{u.creation_date}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.uid)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProfileScreen;
