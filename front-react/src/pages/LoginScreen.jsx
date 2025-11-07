import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ApiService } from "../services/auth/auth.service";


const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // on envoie l'objet entier { email, password } à ton backend
    const userData = await ApiService.LoginUser({
      email: formData.email,
      password: formData.password
    });

    // si tout est OK, on connecte l'utilisateur
    login(userData);

    // redirection selon le rôle
    navigate(userData.role === "admin" ? "/admin" : "/home");

  } catch (err) {
    setError("Email ou mot de passe incorrect.");
    console.error(err); // pour debug
  }
};
;

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Connexion</h3>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              className="form-control mb-2"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-100" type="submit">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
