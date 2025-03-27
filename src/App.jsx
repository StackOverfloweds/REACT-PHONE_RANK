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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    const storedToken = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    setToken(storedToken);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Router>
          <Navbar />
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
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
