import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, ShoppingBag, Shield, Bell, CreditCard, LogOut, Edit } from "lucide-react";
import "../styles/MyProfilePage.css";
import Footer from "../components/Footer.jsx";

const MyProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+381 60 123 4567",
    address: "Belgrade, Serbia"
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }
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
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
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
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
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
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
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
              onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
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
      <h3>Recent Orders</h3>
      <div className="orders-list">
        <div className="order-item">
          <div className="order-info">
            <h4>Order #12345</h4>
            <p>Date: January 15, 2024</p>
            <p>Total: 2,500 RSD</p>
          </div>
          <span className="order-status completed">Completed</span>
        </div>
        <div className="order-item">
          <div className="order-info">
            <h4>Order #12344</h4>
            <p>Date: January 10, 2024</p>
            <p>Total: 1,800 RSD</p>
          </div>
          <span className="order-status completed">Completed</span>
        </div>
      </div>
      <button 
        className="view-all-orders-btn"
        onClick={() => navigate("/orders")}
      >
        View All Orders
      </button>
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
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p>
        
        <h4>Use of Information</h4>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
        
        <h4>Information Sharing</h4>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
        
        <h4>Data Security</h4>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
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
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              Profile Information
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={20} />
              My Orders
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
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
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'orders' && renderOrdersTab()}
          {activeTab === 'settings' && renderSettingsTab()}
          {activeTab === 'privacy' && renderPrivacyTab()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage;