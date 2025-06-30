import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/ProductsPage.css";
import Footer from "../components/Footer.jsx";
import CurrencySelector from "../components/CurrencySelector";
import { fetchExchangeRate } from "../utils/fetchExchangeRate";


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });

  const productsPerPage = 12;
  const token = sessionStorage.getItem("auth_token");
  const location = useLocation();
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


  const getCategoryId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category_id");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryId = getCategoryId();
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(storedUser);

      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("api/products"),
        axios.get("/api/categories"),
      ]);

      const fetchedProducts = productsRes.data.products || [];
      const fetchedCategories = categoriesRes.data.category || [];

      setAllProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setFilterCategory(categoryId || "");

      if (categoryId) {
        const filtered = fetchedProducts.filter(
          (product) => product.category_id === parseInt(categoryId)
        );
        setProducts(filtered);

        const catRes = await axios.get(`api/categories/${categoryId}`);
        setCategoryName(catRes.data.name || "");
      } else {
        setProducts(fetchedProducts);
        setCategoryName("");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleSort = (sortType) => {
    let sortedProducts = [...products];
    switch (sortType) {
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        sortedProducts.sort((a, b) => Number(a.price) * (rates[currency] ?? 1) - Number(b.price) * (rates[currency] ?? 1));
        break;
      case "price-high":
        sortedProducts.sort((a, b) => Number(b.price) * (rates[currency] ?? 1) - Number(a.price) * (rates[currency] ?? 1));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const handleFilter = (categoryId) => {
    if (categoryId === "") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category_id === parseInt(categoryId)
      );
      setProducts(filtered);
    }
    setFilterCategory(categoryId);
    setCurrentPage(1);
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
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

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/api/products/${editingProduct}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", category_id: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1 className="products-title">{categoryName || "All Products"}</h1>
          <CurrencySelector currency={currency} setCurrency={setCurrency} rates={rates} />

          <div className="products-controls">
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} /> Filters & Sort
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-section">
            <div className="filter-group">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Filter by Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="products-grid">
          {currentProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => {
                if (user?.email !== "admin@gmail.com") goToDetails(product.id);
              }}
            >
              <div className="product-image-container">
                <img
                  src={
                    product.image_url
                      ? `http://127.0.0.1:8000/${product.image_url}`
                      : "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg"
                  }
                  className="product-image"
                  alt={product.name}
                />
                <div className="product-overlay">
                  {user?.email !== "admin@gmail.com" && (
                    <button
                      className="quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetails(product.id);
                      }}
                    >
                      Quick View
                    </button>
                  )}
                </div>
              </div>

              <div className="product-info">
                {editingProduct === product.id ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn-update">
                      Update
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">
                      Category:{" "}
                      {categories.find((cat) => cat.id === product.category_id)
                        ?.name || "Unknown"}
                    </p>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#ffd700"
                          color="#ffd700"
                        />
                      ))}
                      <span className="rating-count">(4.8)</span>
                    </div>
                    <div className="product-footer">
                      <div className="product-price">
                        <span className="price-amount">
                          {(Number(product.price) * (rates[currency] ?? 1)).toFixed(2)}{" "} {currency}
                        </span>
                      </div>
                      {user?.email === "admin@gmail.com" ? (
                        <div className="admin-actions">
                          <button
                            className="admin-btn btn-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn btn-delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart size={18} />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try browsing different categories or check back later.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
