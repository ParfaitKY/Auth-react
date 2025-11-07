import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import HomeScreen from "./pages/HomeScreen";
import AdminProfileScreen from "./pages/AdminProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // ✅ Affiche BottomNav sur /home (user connecté) ou /admin (admin connecté)
  const showBottomNav =
    user && (location.pathname === "/home" || location.pathname === "/admin");

  return (
    <>
      <Navbar />
      <div className="container mt-3 pt-5">
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute role="user">
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<SplashScreen />} />
        </Routes>
      </div>

      {/* ✅ BottomNav visible uniquement sur /home et /admin */}
      {showBottomNav && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
