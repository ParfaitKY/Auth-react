import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register as registerAPI } from "../services/auth/authService";

const RegisterScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [motpreferer, setMotpreferer] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const userData = await registerAPI(email, password, motpreferer, role);
      login(userData);
      navigate(role === "admin" ? "/admin" : "/home");
    } catch (err) {
      alert("Erreur inscription : " + err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Inscription</h3>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Confirmer mot de passe" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            <input className="form-control mb-2" placeholder="Mot préféré" value={motpreferer} onChange={(e) => setMotpreferer(e.target.value)} required />
            <select className="form-select mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn btn-primary w-100" type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
