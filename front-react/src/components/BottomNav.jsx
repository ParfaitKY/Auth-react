import { Link, useLocation } from "react-router-dom";
import { Home, Grid, ShoppingCart, User } from "lucide-react"; // icônes adaptées
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={currentPath === "/home" ? "active" : ""}>
        <Home size={22} />
        <span>Accueil</span>
      </Link>
      <Link to="/categories" className={currentPath === "/categories" ? "active" : ""}>
        <Grid size={22} />
        <span>Categories</span>
      </Link>
      <Link to="/cart" className={currentPath === "/cart" ? "active" : ""}>
        <ShoppingCart size={22} />
        <span>Panier</span>
      </Link>
      <Link to="/account" className={currentPath === "/account" ? "active" : ""}>
        <User size={22} />
        <span>Compte</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
