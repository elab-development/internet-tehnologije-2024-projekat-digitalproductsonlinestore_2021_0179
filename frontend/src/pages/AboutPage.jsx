import React from "react";
import { Download, Shield, Clock, Users, Star, Award, Globe, Heart } from "lucide-react";
import "../styles/AboutPage.css";
import Footer from "../components/Footer.jsx";

const AboutPage = () => {
  const stats = [
    { icon: <Users size={32} />, number: "50,000+", label: "Happy Customers" },
    { icon: <Download size={32} />, number: "1M+", label: "Downloads" },
    { icon: <Star size={32} />, number: "4.9", label: "Average Rating" },
    { icon: <Globe size={32} />, number: "150+", label: "Countries Served" }
  ];

  const features = [
    {
      icon: <Download size={32} />,
      title: "Instant Download",
      description: "Get your digital products immediately after purchase with secure download links."
    },
    {
      icon: <Shield size={32} />,
      title: "Licensed Content",
      description: "All products come with proper licensing for commercial and personal use."
    },
    {
      icon: <Award size={32} />,
      title: "Premium Quality",
      description: "Curated collection of high-quality digital assets from top creators."
    }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">About Cloudery</h1>
            <p className="hero-subtitle">
              Your premier destination for high-quality digital assets, templates, and creative resources.
            </p>
            <div className="hero-description">
              <p>
                Founded in 2020, Cloudery has grown to become one of the most trusted digital marketplaces, 
                serving creators, businesses, and individuals worldwide with premium digital content.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              At Cloudery, we believe that great design and quality digital assets should be accessible to everyone. 
              Our mission is to connect talented creators with individuals and businesses who need premium digital 
              content, fostering a community where creativity thrives and innovation flourishes.
            </p>
            <div className="mission-values">
              <div className="value-item">
                <Heart size={24} />
                <span>Passion for Quality</span>
              </div>
              <div className="value-item">
                <Shield size={24} />
                <span>Trust & Security</span>
              </div>
              <div className="value-item">
                <Users size={24} />
                <span>Community First</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why Choose Cloudery?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-content">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-text">
              Have questions or need support? We'd love to hear from you.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> support@Cloudery.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +381 11 123 4567
              </div>
              <div className="contact-item">
                <strong>Address:</strong> Belgrade, Serbia
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;