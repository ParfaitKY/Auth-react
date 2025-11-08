import { useState } from "react";
import { ApiService } from "../services/auth/auth.service";

const ForgotPasswordScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    motpreferer: "",
    newPassword: "",
    confirm: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await ApiService.ResetPassword({
        email: formData.email,
        motpreferer: formData.motpreferer,
        newpassword: formData.newPassword,
        confirmpassword: formData.confirm
      });

      if (res.status === 'success') {
        setSuccess(res.message || "Mot de passe réinitialisé avec succès !");
        // Optionnel: rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(res.message || "Erreur lors de la réinitialisation.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Une erreur est survenue.");
      console.error(err);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Réinitialiser le mot de passe</h3>
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
              name="motpreferer"
              className="form-control mb-2"
              placeholder="Mot préféré"
              value={formData.motpreferer}
              onChange={handleChange}
              required
            />
            <input
              name="newPassword"
              className="form-control mb-2"
              type="password"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
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
            <button className="btn btn-primary w-100" type="submit">
              Réinitialiser
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
