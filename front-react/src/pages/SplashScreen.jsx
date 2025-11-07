import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./SplashScreen.css"; // On ajoutera des styles personnalisés

const SplashScreen = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === "admin" ? "/admin" : "/home");
    }
  }, [user, loading, navigate]);

  if (loading)
    return (
      <div className="splash-container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!user) {
    return (
      <div className="splash-container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center p-4 splash-box shadow rounded">
          <h1 className="mb-3 splash-title">Bienvenue sur Coocle</h1>
          <p className="mb-4 text-muted">Découvrez, trouvez et explorez ce que vous aimez !</p>
          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary-custom btn-lg"
              onClick={() => navigate("/login")}
            >
              Connexion
            </button>

            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate("/register")}
            >
              Inscription
            </button>
          </div>
          <div className="mt-4">
            <small className="text-muted">Sécurisé, rapide et facile à utiliser</small>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SplashScreen;
