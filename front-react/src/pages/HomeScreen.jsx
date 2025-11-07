import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  // Vérifie si l'utilisateur est bien chargé
  if (!user) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-4 border rounded shadow-sm">
        <h1>Bienvenue, <strong>{user.email}</strong></h1>
        <p>
          Vous êtes connecté en tant que{" "}
          <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong>
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
