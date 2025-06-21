import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
      navigate("/login");
      return;
    }


    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    let upadatedCart;
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-col">
      <div className="product-card" onClick={goToDetails}>
        <img
          src={
            product.image_url
              ? `http://127.0.0.1:8000/${product.image_url}`
              : "/placeholder.jpg"
          }
          className="product-image"
          alt={product.name}
        />
        <div className="product-body">
          <h5 className="product-title">{product.name}</h5>
          <p className="product-text">
            {product.description?.substring(0, 100)}...
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="product-price">
              {Number(product.price).toFixed(2)} EUR
            </span>
            <button
              className="btn btn-outline-info btn-sm"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
