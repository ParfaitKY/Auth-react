import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card p-4 shadow text-center">
          <h3 className="mb-3">Bienvenue, {user?.email}</h3>
          <p>Vous êtes connecté en tant que <strong>{user?.role}</strong>.</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
