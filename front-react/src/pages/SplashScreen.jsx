import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SplashScreen = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) navigate(user.role === "admin" ? "/admin" : "/home");
    }
  }, [user, loading]);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h3 className="mb-4">Vous n’êtes pas connecté</h3>
          <button className="btn btn-primary me-2" onClick={() => navigate("/login")}>Connexion</button>
          <button className="btn btn-secondary" onClick={() => navigate("/register")}>Inscription</button>
        </div>
      </div>
    );
  }

  return null;
};

export default SplashScreen;
