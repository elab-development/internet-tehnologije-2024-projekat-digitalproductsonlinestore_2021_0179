import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/NavBar.css";

function Navbar() {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  const loadAuthData = () => {
    const storedToken = sessionStorage.getItem("auth_token");
    const storedUser = sessionStorage.getItem("user");

    setToken(storedToken);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  loadAuthData(); // on mount

  window.addEventListener("authChanged", loadAuthData);

  return () => {
    window.removeEventListener("authChanged", loadAuthData);
  };
}, []);


  const handleLogout = () => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("cart");
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "fw-bold text-primary" : "";

  const isAdmin = user?.email === "admin@gmail.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">
        {/* Logo + naziv */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <strong className="fs-3">Cloudery</strong>
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
          <ul className="navbar-nav mx-auto text-center mb-2 mb-lg-0 d-flex">

            {/* Shared Links */}
            <li className="nav-item">
              <NavLink to="/" className={`nav-link fs-6 ${isActive("/")}`}>
                Home
              </NavLink>
            </li>

            {!isAdmin ? (
              <>
                {/* USER nav */}
                <li className="nav-item">
                  <NavLink
                    to="/products"
                    className={`nav-link fs-6 ${isActive("/products")}`}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item" style={{ minWidth: "130px" }}>
                  <NavLink
                    to="/profile"
                    className={`nav-link fs-6 ${isActive("/profile")}`}
                  >
                    My Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* ADMIN nav */}
                <li className="nav-item">
                  <NavLink
                    to="/admin/products"
                    className={`nav-link fs-6 ${isActive("/admin/products")}`}
                  >
                    Manage Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/orders"
                    className={`nav-link fs-6 ${isActive("/admin/orders")}`}
                  >
                    User Orders
                  </NavLink>
                </li>
                <li className="nav-item" style={{ minWidth: "140px" }}>
                  <NavLink
                    to="/admin/profile"
                    className={`nav-link fs-6 ${isActive("/admin/profile")}`}
                  >
                    Admin Profile
                  </NavLink>
                </li>
              </>
            )}

            {/* Always show About */}
            <li className="nav-item">
              <NavLink to="/about" className={`nav-link fs-6 ${isActive("/about")}`}>
                About
              </NavLink>
            </li>
          </ul>

          <hr className="d-lg-none my-2" />

          {/* Right side: Cart or Auth buttons */}
          <ul className="navbar-nav ms-auto text-center mb-2 mb-lg-0 d-flex align-items-center gap-2">
            {token ? (
              <>
                {/* Only users (not admin) see Cart */}
                {!isAdmin && (
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
                )}

                {/* Logout */}
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
                  <Link
                    to="/login"
                    className={`nav-link fs-6 ${isActive("/login")}`}
                  >
                    Login
                  </Link>
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
