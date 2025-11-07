import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ApiService } from "../services/auth/auth.service";

const RegisterScreen = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm: "",
    motpreferer: "",
    role: "user"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userData = await ApiService.RegisterUser({
        email: formData.email,
        password: formData.password,
        motpreferer: formData.motpreferer,
        role: formData.role
      });

      login(userData);
      setSuccess("Inscription réussie !");
      navigate(userData.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
      console.error(err);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Inscription</h3>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
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
            <input
              name="confirm"
              className="form-control mb-2"
              type="password"
              placeholder="Confirmer mot de passe"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
            <input
              name="motpreferer"
              className="form-control mb-2"
              placeholder="Mot préféré"
              value={formData.motpreferer}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              className="form-select mb-2"
              value={formData.role}
              onChange={handleChange}
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
