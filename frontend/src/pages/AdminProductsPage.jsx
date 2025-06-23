import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminProductsPage.css"; 

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category_id: "" });

  const token = sessionStorage.getItem("auth_token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products); 
  };

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data.category); // prilagodi ako ti je struktura drugačija
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    }
  };

  return (
    <div className="admin-products-page">
      <h1 className="admin-title">Manage Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card-admin" key={product.id}>
            {editingProduct === product.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <select name="category_id" value={formData.category_id} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn-update">Update</button>
              </form>
            ) : (
              <>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-price-admin">${product.price}</p>
                <div className="admin-actions">
                  <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
