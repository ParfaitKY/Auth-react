import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register as registerAPI } from "../services/authService";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [motpreferer, setMotPreferer] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      const userData = await registerAPI({ email, password, confirmpassword: confirm, motpreferer, role });
      login(userData); // Mise à jour du contexte
      navigate(role === "admin" ? "/admin" : "/home");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Inscription</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Confirmer mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Mot préféré (récupération mot de passe)"
              value={motpreferer}
              onChange={(e) => setMotPreferer(e.target.value)}
              required
            />
            <select
              className="form-select mb-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
