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
    const response = await ApiService.LoginUser({
      email: formData.email,
      password: formData.password
    });

    // Vérifier si la connexion est réussie
    if (response.status === 'success' && response.user_infos) {
      // si tout est OK, on connecte l'utilisateur
      login(response.user_infos);

      // redirection selon le rôle
      navigate(response.user_infos.role === "admin" ? "/admin" : "/home");
    } else {
      setError(response.message || "Email ou mot de passe incorrect.");
    }

  } catch (err) {
    setError("Email ou mot de passe incorrect.");
    console.error(err); // pour debug
  }
};
;

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="col-md-6">
        <div className="card auth-card p-4 shadow-sm">
          <h3 className="text-center mb-3">Connexion</h3>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              className="form-control form-control-lg mb-3"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              className="form-control form-control-lg mb-3"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-100 btn-lg" type="submit">
              Se connecter
            </button>
          </form>
          <div className="text-center mt-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate("/forgot-password"); }}
              className="text-decoration-none small link-forgot"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
