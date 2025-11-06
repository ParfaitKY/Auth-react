import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [favorite, setFavorite] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    // Vérification côté front simulée
    setStep(2);
  };

  const handleReset = (e) => {
    e.preventDefault();
    login({ email, role: "user" }); // par défaut user
    navigate("/home");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Mot de passe oublié</h3>
          {step === 1 && (
            <form onSubmit={handleVerify}>
              <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Mot préféré" value={favorite} onChange={(e) => setFavorite(e.target.value)} required />
              <button className="btn btn-primary w-100" type="submit">Vérifier</button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleReset}>
              <input className="form-control mb-2" type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <button className="btn btn-success w-100" type="submit">Réinitialiser</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
