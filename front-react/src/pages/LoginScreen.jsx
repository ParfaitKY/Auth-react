import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginAPI } from "../services/auth/authService";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginAPI(email, password);
      login(userData);
      navigate(userData.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      alert("Erreur de connexion : " + err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Connexion</h3>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-primary w-100" type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
