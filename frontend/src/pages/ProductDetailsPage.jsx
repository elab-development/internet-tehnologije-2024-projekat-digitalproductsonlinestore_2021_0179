import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Star,
  ArrowLeft,
  Download,
  Shield,
  Clock,
} from "lucide-react";
import "../styles/ProductDetailsPage.css";
import Footer from "../components/Footer.jsx";
import { handleBuyNow } from "../utils/api.js";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      alert("This product is already in your cart!");
      return;
    }

    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    alert("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="error-container">
          <h3>Product not found</h3>
          <button onClick={() => navigate("/products")} className="back-btn">
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="product-details-grid">
          <div className="product-images">
            <div className="main-image">
              <img
                src={
                  product.image_url
                    ? `http://127.0.0.1:8000/${product.image_url}`
                    : "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg"
                }
                alt={product.name}
              />
            </div>
            <div className="image-thumbnails">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={
                      product.image_url
                        ? `http://127.0.0.1:8000/${product.image_url}`
                        : "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg"
                    }
                    alt={`${product.name} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                ))}
                <span className="rating-text">(4.8) • 127 reviews</span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">
                {Number(product.price).toFixed(2)} RSD
              </span>
              <span className="original-price">
                {(Number(product.price) * 1.3).toFixed(2)} RSD
              </span>
              <span className="discount">25% OFF</span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <Download size={20} />
                <span>Instant Download</span>
              </div>
              <div className="feature">
                <Shield size={20} />
                <span>License Included</span>
              </div>
              <div className="feature">
                <Clock size={20} />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                className="buy-now-btn"
                onClick={() =>
                  handleBuyNow(
                    product,
                    sessionStorage.getItem("auth_token"),
                    navigate
                  )
                }
              >
                Buy Now
              </button>
              <button
                className="view-cart-btn"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            </div>

            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">File Format:</span>
                  <span className="spec-value">PSD, AI, PNG</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Resolution:</span>
                  <span className="spec-value">300 DPI</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Size:</span>
                  <span className="spec-value">A4, Letter</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">License:</span>
                  <span className="spec-value">Commercial Use</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
