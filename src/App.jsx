import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Product from "./pages/Product/Product";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import HeaderSlider from "./components/HeaderSlider";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process, then hide the loading component
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
