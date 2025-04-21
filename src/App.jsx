import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Product from "./pages/Product/Product";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import HeaderSlider from "./components/HeaderSlider";
import LoadingComponent from "./components/LoadingComponent";
import Register from "./pages/Auth/Register";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import Searching from "./pages/Searching/Searching";
import Cookies from "js-cookie";
import NavbarAdmin from "./components/admin/NavbarAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import CreateSmartphone from "./pages/admin/smartphones/createSmartphone";
import ViewSmartphones from "./pages/admin/smartphones/viewSmartphones";

function ProtectedRoute({ element, condition, redirectTo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!condition) {
      navigate(redirectTo);
    }
  }, [condition, navigate, redirectTo]);

  return condition ? element : null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("user"); // default user

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const storedToken = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    const storedRole = Cookies.get(import.meta.env.VITE_API_ROLE_USR);
    setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  const isAdmin = role === "admin";

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Router>
          {isAdmin ? <NavbarAdmin /> : <Navbar />}
          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<><HeaderSlider /><Home /></>} />
              <Route path="/product" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route 
                path="/searching" 
                element={<ProtectedRoute element={<Searching />} condition={!!token} redirectTo="/" />} 
              />

              {/* ✅ Route khusus admin */}
              <Route 
                path="/admin/dashboard" 
                element={<ProtectedRoute element={<DashboardAdmin />} condition={isAdmin} redirectTo="/" />} 
              />
            <Route 
              path="/admin/phones/create" 
              element={<ProtectedRoute element={<CreateSmartphone />} condition={isAdmin} redirectTo="/" />} 
            />
            <Route 
              path="/admin/phones/view" 
              element={<ProtectedRoute element={<ViewSmartphones />} condition={isAdmin} redirectTo="/" />} 
            />

            </Routes>
            {/* 📱 Route CRUD untuk Phones */}
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
