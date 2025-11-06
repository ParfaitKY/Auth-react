import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AuthApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                {/* <li className="nav-item"><Link className="nav-link" to="/forgot-password">Forgot Password</Link></li> */}
              </>
            )}
            {user && user.role === "user" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                <li className="nav-item"><button className="btn btn-danger btn-sm ms-2" onClick={logout}>Logout</button></li>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                <li className="nav-item"><button className="btn btn-danger btn-sm ms-2" onClick={logout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
