import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [motpreferer, setMotPreferer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const msg = await resetPassword({
        email,
        motpreferer,
        newpassword: newPassword,
        confirmpassword: confirm
      });
      alert(msg);
      navigate("/login"); // Retour à la page login après reset
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
          <h3 className="text-center mb-3">Réinitialiser le mot de passe</h3>
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
              type="text"
              className="form-control mb-2"
              placeholder="Mot préféré"
              value={motpreferer}
              onChange={(e) => setMotPreferer(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Réinitialisation..." : "Réinitialiser"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
