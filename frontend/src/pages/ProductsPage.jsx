import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/ProductsPage.css";
import Footer from "../components/Footer.jsx";

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
  const productsPerPage = 12;
  
  const location = useLocation();
  const navigate = useNavigate();

  const getCategoryId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category_id");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryId = getCategoryId();
        const productUrl = categoryId
          ? `api/products?category_id=${categoryId}`
          : `api/products`;

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(productUrl),
          axios.get('/api/categories')
        ]);

        const fetchedProducts = productsRes.data.products || [];
        setProducts(fetchedProducts);
        setAllProducts(fetchedProducts);
        setCategories(categoriesRes.data.category || []);

        if (categoryId) {
          const catRes = await axios.get(`api/categories/${categoryId}`);
          setCategoryName(catRes.data.name || "");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const handleSort = (sortType) => {
    let sortedProducts = [...products];
    switch (sortType) {
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
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
      const filtered = allProducts.filter(product => product.category_id === parseInt(categoryId));
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
    const token = sessionStorage.getItem("auth_token");
    
    if (!token) {
      navigate("/register");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      alert("This product is already in your cart!");
      return;
    }
    
    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    alert("Product added to cart!");
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
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
          {categoryName ? (
            <h1 className="products-title">{categoryName}</h1>
          ) : (
            <h1 className="products-title">All Products</h1>
          )}
          <div className="products-controls">
            <button 
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters & Sort
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-section">
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Filter by Category:</label>
              <select value={filterCategory} onChange={(e) => handleFilter(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
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
              onClick={() => goToDetails(product.id)}
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
                  <button 
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDetails(product.id);
                    }}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-category">
                  Category: {categories.find(cat => cat.id === product.category_id)?.name || 'Unknown'}
                </p>
                
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#ffd700" color="#ffd700" />
                  ))}
                  <span className="rating-count">(4.8)</span>
                </div>
                
                <div className="product-footer">
                  <div className="product-price">
                    <span className="price-amount">{Number(product.price).toFixed(2)} RSD</span>
                  </div>
                  
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
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
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
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
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;