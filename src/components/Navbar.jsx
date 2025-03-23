import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "/logo_nav.ico";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Logout } from "../api/Auth";
import { NavDropdown } from "react-bootstrap";
const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = Cookies.get(import.meta.env.VITE_API_NAME_USR);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await Logout(); 
  
      if (response && response.status === 200) {
        setUsername(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark" 
      style={{
        background: "linear-gradient(to right, #E3FDFD, #CBF1F5, #A6E3E9, #71C9CE)"
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          style={{ fontWeight: "bold", color: "black" }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: "35px", height: "35px", marginRight: "10px" }} 
          />
          PhoneRank
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontWeight: "bold", color: "black" }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product" style={{ fontWeight: "bold", color: "black" }}>Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ fontWeight: "bold", color: "black" }}>About</Link>
            </li>
            {username ? (
          <li className="nav-item dropdown">
            <NavDropdown 
              title={<span style={{ fontWeight: "bold", color: "black" }}>{username}</span>} 
              id="userDropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </li>
        ) : (
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={{ fontWeight: "bold", color: "black" }}>Login</Link>
          </li>
        )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
