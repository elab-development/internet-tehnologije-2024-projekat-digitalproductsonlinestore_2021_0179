import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProductsPage.css";
import { useLocation } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const location = useLocation();

  const getCategoryId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category_id");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const categoryId = getCategoryId();

        // Dohvati proizvode
        const productUrl = categoryId
          ? `api/products?category_id=${categoryId}`
          : `api/products`;

        const productResponse = await axios.get(productUrl);
        console.log("Proizvodi:", productResponse.data.products);
        setProducts(productResponse.data.products);

        // Ako postoji category_id, dohvati i ime kategorije
        if (categoryId) {
          const categoryResponse = await axios.get(
            `api/categories/${categoryId}`
          );
          setCategoryName(categoryResponse.data.name || "");
        }
      } catch (error) {
        console.error("Greška:", error);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleAddToCart = (product) => {
    console.log("Dodato u korpu:", product.name);
    // Ovdje ide dodavanje u korpu kasnije
  };

  return (
    <div className="products-container">
      {categoryName && (
        <h2 className="category-header">Category: {categoryName}</h2>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src="/placeholder.png"
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-bottom">
              <span className="product-price">
  ${Number(product.price).toFixed(2)}
</span>

              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
