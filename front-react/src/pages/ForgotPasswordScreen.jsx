import { useState } from "react";
import { resetPassword } from "../services/auth/authService";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [motpreferer, setMotpreferer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await resetPassword(email, motpreferer, newPassword, confirm);
      alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Réinitialiser le mot de passe</h3>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="form-control mb-2" placeholder="Mot préféré" value={motpreferer} onChange={(e) => setMotpreferer(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Confirmer mot de passe" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            <button className="btn btn-primary w-100" type="submit">Réinitialiser</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
