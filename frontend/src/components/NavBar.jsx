import {NavLink,  Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/NavBar.css"; 

function Navbar() {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("auth_token");
    setToken(storedToken);

    // Load cart count from localStorage or backend if needed
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("cart");
    setToken(null);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "fw-bold text-primary" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">
        {/* Logo + naziv */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="Logo" height="50" className="me-3" />
          <strong className="fs-3">Lootify</strong>
        </Link>

        {/* Hamburger meni za mobilni prikaz */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigacija */}
        <div className="collapse navbar-collapse justify-content-between" id="mainNavbar">
          <ul className="navbar-nav mx-auto text-center mb-2 mb-lg-0 d-flex gap-3">
            <li className="nav-item">
              <NavLink to="/" className={`nav-link fs-6 ${isActive("/")}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={`nav-link fs-6 ${isActive("/products")}`}
              >
                Products
              </NavLink>
            </li>
            
            {token && (
              <li className="nav-item">
                <NavLink to="/profile" className={`nav-link fs-6 ${isActive("/profile")}`}>
                  My Profile
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/about" className={`nav-link fs-6 ${isActive("/about")}`}>
                About
              </NavLink>
            </li>
          </ul>

          <hr className="d-lg-none my-2" />

          {/* Desni deo: Cart + Login/Register ili Logout */}
          <ul className="navbar-nav ms-auto text-center mb-2 mb-lg-0 d-flex align-items-center gap-2">
            {token ? (
              <>
                {/* Cart ikonica */}
                <li className="nav-item me-3 position-relative">
                  <Link to="/cart" className="nav-link">
                    <FaShoppingCart size={22} />
                    {cartCount > 0 && (
                      <span className="position-absolute top-1 start-95 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                {/* Logout dugme */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-secondary fs-6 btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className={`nav-link fs-6 ${isActive("/login")}`}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={`btn btn-info fs-6 ${isActive("/register")}`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
