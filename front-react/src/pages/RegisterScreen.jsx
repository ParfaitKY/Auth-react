import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [favoriteWord, setFavoriteWord] = useState(""); // <-- nouveau champ
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (!favoriteWord) {
      alert("Veuillez saisir votre mot préféré pour la récupération de mot de passe");
      return;
    }

    // Ici on envoie normalement au backend via POST /register
    // Pour l'instant on simule l'enregistrement dans le contexte
    login({ email, role, favoriteWord });

    navigate(role === "admin" ? "/admin" : "/home");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Inscription</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              placeholder="Confirmer mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              placeholder="Mot préféré"
              value={favoriteWord}
              onChange={(e) => setFavoriteWord(e.target.value)}
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
            <button className="btn btn-primary w-100" type="submit">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
