import React from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { Download, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover the world of
              <span className="hero-title-highlight">digital products</span>
            </h1>
            <p className="hero-subtitle">
              Find quality e-books, courses, software, graphics and everything
              you need for digital success
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="hero-button hero-button-primary">
                <Search className="w-5 h-5" />
                <span>Explore Products</span>
              </Link>
              <Link
                to="/register"
                className="hero-button hero-button-secondary"
              >
                <Star className="w-5 h-5" />
                <span>Sign Up Free</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">
              Browse our wide range of digital products organized by categories
            </p>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured for You</h2>
            <p className="section-subtitle">
              Latest and most popular digital products specially selected for
              you
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Digital Products</div>
            </div>
            <div>
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Sign up today and get access to thousands of quality digital
            products
          </p>
          <Link to="/register" className="cta-button">
            <Download className="w-5 h-5" />
            <span>Start Free</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

