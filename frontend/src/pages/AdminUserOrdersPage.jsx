import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminUserOrdersPage.css";
import { useNavigate } from "react-router-dom";

const AdminUserOrdersPage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.users.filter(u => u.role === "user");
      setUsers(filtered || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOrders = async (userId) => {
    console.log("Fetching orders for user ID:", userId); 
    try {
      const res = await axios.get(`/api/users/${userId}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched orders:", res.data);
      setSelectedUser(res.data.user);
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    String(user.id).includes(query)
  );

  return (
    <div className="admin-orders-page">
      <h1 className="admin-title">Users' Orders</h1>
      <button
        className="view-stats-btn"
        onClick={() => navigate("/admin/stats")}
      >
        View Purchase Statistics
      </button>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by ID, name, or email..."
        value={query}
        onChange={handleSearch}
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-card ${selectedUser?.id === user.id ? "active" : ""}`}
            onClick={() => fetchOrders(user.id)}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="user-orders">
          <h2>
            Orders for {selectedUser.name} ({selectedUser.email})
          </h2>

          {orders.length === 0 ? (
            <p className="no-orders">No orders found for this user.</p>
          ) : (
            orders.map((order) => (
              <div key={order.order_id} className="order-card">
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.total_price}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} - ${product.price} 
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUserOrdersPage;
