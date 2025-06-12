import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer bg-black text-white py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Logo i naziv */}
        <div className="mb-3 mb-md-0 d-flex align-items-center gap-2">
          <img src="/logo.png" alt="Lootify Logo" height="30" />
          <span className="fw-bold">Lootify</span>
        </div>

        {/* Linkovi */}
        <ul className="footer-links list-unstyled d-flex gap-3 mb-3 mb-md-0">
          <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
          <li><Link to="/products" className="text-white text-decoration-none">Products</Link></li>
          <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
        </ul>

        {/* Copyright */}
        <div className="footer-copy text-secondary small">
          &copy; {new Date().getFullYear()} Lootify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
