import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import "../styles/CartPage.css";
import { handleBuyNow, handleCheckoutMultiple } from "../utils/api";
import CurrencySelector from "../components/CurrencySelector";
import { fetchExchangeRate } from "../utils/fetchExchangeRate";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [currency, setCurrency] = useState(sessionStorage.getItem("currency") || "EUR");
  const [rates, setRates] = useState({});

useEffect(() => {
  fetchExchangeRate("EUR").then(r => {
    if (r) setRates(r);
  });
}, []);

useEffect(() => {
  sessionStorage.setItem("currency", currency);
}, [currency]);


  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [navigate]);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
  const token = sessionStorage.getItem("auth_token");
  handleCheckoutMultiple(cartItems, token, navigate);
};


  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="empty-cart">
            <ShoppingBag size={64} />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <CurrencySelector currency={currency} setCurrency={setCurrency} rates={rates}/>
          <p className="cart-count">{cartItems.length} items</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={
                      item.image_url
                        ? `http://127.0.0.1:8000/${item.image_url}`
                        : "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg"
                    }
                    alt={item.name}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">
                    {(Number(item.price) * (rates[currency] ?? 1)).toFixed(2)} {currency}

                  </div>
                </div>

                <div className="item-total">
                  {(Number(item.price) * item.quantity * (rates[currency] ?? 1)).toFixed(2)} {currency}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={20} />
                </button>
                <button
                  className="checkout-btn"
                  onClick={() =>
                    handleBuyNow(
                      item,
                      sessionStorage.getItem("auth_token"),
                      navigate
                    )
                  }
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>{(getTotalPrice() * (rates[currency] ?? 1)).toFixed(2)} {currency}</span>
              </div>

              <div className="summary-line">
                <span>Tax</span>
                <span>{(getTotalPrice() * 0.1 * (rates[currency] ?? 1)).toFixed(2)} {currency}</span>
              </div>

              <div className="summary-line total">
                <span>Total</span>
                <span>{(getTotalPrice() * 1.1 * (rates[currency] ?? 1)).toFixed(2)} {currency}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
