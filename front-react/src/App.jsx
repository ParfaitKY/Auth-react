import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import HomeScreen from "./pages/HomeScreen";
import AdminProfileScreen from "./pages/AdminProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-3 pt-5">
          <Routes>
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            {/* <Route path="/home" element={<ProtectedRoute role="user"><HomeScreen /></ProtectedRoute>} /> */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminProfileScreen /></ProtectedRoute>} />
            {/* <Route path="/admin" element={<ProtectedRoute role="admin"><AdminProfileScreen /></ProtectedRoute>} /> */}
            <Route path="*" element={<SplashScreen />} />
          </Routes>
        </div>
        {<BottomNav />}
        {/* {user && <BottomNav />} */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
