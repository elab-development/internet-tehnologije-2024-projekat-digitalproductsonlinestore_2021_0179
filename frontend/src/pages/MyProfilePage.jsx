import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  ShoppingBag,
  Shield,
  CreditCard,
  LogOut,
  Edit,
} from "lucide-react";
import "../styles/MyProfilePage.css";
import Footer from "../components/Footer.jsx";
import axios from "axios";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+381 60 123 4567",
    address: "Belgrade, Serbia",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/api/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const ordersData = response.data.data; // zato što koristiš OrderResource::collection
        setOrders(ordersData);

        if (ordersData.length > 0) {
          const { user } = ordersData[0]; // uzmi podatke o korisniku iz prvog order-a
          setUserInfo({
            name: user.name,
            email: user.email,
            phone: "", // Laravel ti ne šalje phone, osim ako ga dodaš
            address: "", // isto
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load user orders", error);
        navigate("/login"); // ako token nije važeći
      });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const renderProfileTab = () => (
    <div className="profile-tab">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <div className="profile-info">
          <h2>{userInfo.name}</h2>
          <p>{userInfo.email}</p>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={16} />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <label>Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
        </div>

        <div className="detail-group">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
        </div>

        <div className="detail-group">
          <label>Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          ) : (
            <span>{userInfo.phone}</span>
          )}
        </div>

        <div className="detail-group">
          <label>Address</label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          ) : (
            <span>{userInfo.address}</span>
          )}
        </div>

        {isEditing && (
          <button className="save-btn" onClick={handleSaveProfile}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="orders-tab">
      <h3>My Orders</h3>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-item" key={order.id}>
              <div className="order-info">
                <h4>Order #{order.id}</h4>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total: {order.total_price} RSD</p>
                {order.products && (
                  <ul>
                    {order.products.map((p) => (
                      <li key={p.id}>{p.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="order-status completed">Completed</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
  const renderPurchasesTab = () => (
    <div className="orders-tab">
      <h3>My Purchases</h3>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>You haven’t purchased anything yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-item" key={order.id}>
              <div className="order-info">
                
                <h4>Purchase #{order.id}</h4>
                <p>
                  Date:{" "}
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>

                <p>Total: {order.total_price} RSD</p>
                {order.products && (
                  <ul>
                    {order.products.map((p) => (
                      <li key={p.id}>{p.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="order-status completed">Purchased</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="settings-tab">
      <div className="settings-group">
        <h3>Notifications</h3>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Email notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Order updates
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Marketing emails
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>Privacy</h3>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Make profile public
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Share purchase history
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>Account</h3>
        <button className="danger-btn">Delete Account</button>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="privacy-tab">
      <h3>Privacy Policy</h3>
      <div className="privacy-content">
        <h4>Data Collection</h4>
        <p>
          We collect information you provide directly to us, such as when you
          create an account, make a purchase, or contact us.
        </p>

        <h4>Use of Information</h4>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, process transactions, and communicate with you.
        </p>

        <h4>Information Sharing</h4>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except as described in this
          policy.
        </p>

        <h4>Data Security</h4>
        <p>
          We implement appropriate security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or
          destruction.
        </p>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <h2>My Account</h2>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={20} />
              Profile Information
            </button>

            <button
              className={`nav-item ${
                activeTab === "purchases" ? "active" : ""
              }`}
              onClick={() => setActiveTab("purchases")}
            >
              <CreditCard size={20} />
              My Purchases
            </button>

            <button
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag size={20} />
              My Orders
            </button>

            <button
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={20} />
              Settings
            </button>

            <button
              className={`nav-item ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              <Shield size={20} />
              Privacy & Policy
            </button>

            <button className="nav-item logout" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "orders" && renderOrdersTab()}
          {activeTab === "purchases" && renderPurchasesTab()}
          {activeTab === "settings" && renderSettingsTab()}
          {activeTab === "privacy" && renderPrivacyTab()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage;
