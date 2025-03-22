import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "/logo_nav.ico"; 

const Navbar = () => {
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
          style={{ fontWeight: 'bold', color: 'black' }}
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
              <Link className="nav-link" to="/" style={{ fontWeight: 'bold', color: 'black' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product" style={{ fontWeight: 'bold', color: 'black' }}>Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ fontWeight: 'bold', color: 'black' }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ fontWeight: 'bold', color: 'black' }}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
