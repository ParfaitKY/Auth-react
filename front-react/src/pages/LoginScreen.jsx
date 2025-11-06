import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login simulé côté front
    const role = email.includes("admin") ? "admin" : "user";
    login({ email, role });
    navigate(role === "admin" ? "/admin" : "/home");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Connexion</h3>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-primary w-100" type="submit">Se connecter</button>
          </form>
          <div className="text-center mt-2">
            <button className="btn btn-link" onClick={() => navigate("/forgot-password")}>Mot de passe oublié ?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
