import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1 className="title">
          👋 Bienvenue, <span className="username">{user?.email}</span>
        </h1>
        <p className="subtitle">
          Vous êtes connecté en tant que{" "}
          <strong className="role">{user?.role}</strong>.
        </p>

        <div className="buttons">
          <button className="btn-primary" onClick={() => navigate("/profile")}>
            Profil
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>

        <div className="footer">
          <p>🌐 Explorez, découvrez et profitez de votre espace personnalisé.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
