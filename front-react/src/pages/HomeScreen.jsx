import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Bienvenue, {user?.email}</h1>
        <p>Vous êtes connecté en tant que <strong>User</strong></p>
      </div>
    </div>
  );
};

export default HomeScreen;
