import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "/logo_nav.ico";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Logout } from "../../api/Auth.js";
import { NavDropdown } from "react-bootstrap";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const storedAdminName = Cookies.get(import.meta.env.VITE_API_NAME_ADM);
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_ADM);

    if (storedAdminName) {
      setAdminName(storedAdminName);
    }

    setHasToken(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await Logout();

      if (response && response.status === 200) {
        Cookies.remove(import.meta.VITE_API_ROLE_USR);
        setAdminName(null);
        setHasToken(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark" 
      style={{
        background: "linear-gradient(to right, #FFE6E6, #E1AFD1, #AD88C6, #7469B6)"
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/admin"
          style={{ fontWeight: "bold", color: "black" }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: "35px", height: "35px", marginRight: "10px" }} 
          />
          Admin Panel
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
              <Link className="nav-link" to="/admin/dashboard" style={{ fontWeight: "bold", color: "black" }}>
                Dashboard
              </Link>
            </li>

            {/* Dropdown Manage Phones */}
            <li className="nav-item dropdown">
              <NavDropdown 
                title={<span style={{ fontWeight: "bold", color: "black" }}>Manage Phones</span>}
                id="phonesDropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/admin/phones/view">
                  📱 View Phones
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/phones/create">
                  ➕ Add New Phone
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} style={{ fontWeight: "bold", color: "black" }}>
                  Logout
                </Link>
              </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
