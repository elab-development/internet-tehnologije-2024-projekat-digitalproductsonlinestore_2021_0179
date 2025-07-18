import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+381 60 123 4567",
    address: "Belgrade, Serbia",
  });
  const isAdmin =
    JSON.parse(sessionStorage.getItem("user"))?.email === "admin@gmail.com";

  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = location.hash?.replace("#", "") || "info"; // podrazumevano "info"

  const handleDownload = async (productId, productName) => {
    const token = sessionStorage.getItem("auth_token");
    console.log("token:", token);

    try {
      const response = await axios.get(`/api/products/${productId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // OBAVEZNO
      });

      console.log("Response headers:", response.headers);
      console.log("Response data type:", response.data.type);

      const mimeType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const extensionMap = {
        "application/pdf": ".pdf",
        "audio/mpeg": ".mp3",
        "audio/mp3": ".mp3",
        "video/mp4": ".mp4",
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
      };

      const ext = extensionMap[mimeType] || "";
      const a = document.createElement("a");
      a.href = url;
      a.download = productName + ext;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed. You may not have access.");
      console.error("Download error:", error.response?.status);
      if (error.response?.status === 404) {
        alert("Fajl ne postoji ili proizvod ne postoji.");
      }
    }
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
            phone: "",
            address: "",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load user orders", error);
        navigate("/login"); // ako token nije važeći
      });
  }, [navigate]);
  const getFileTypeLabel = (filePath) => {
  const ext = filePath.split('.').pop().toLowerCase();

  switch (ext) {
    case "pdf":
      return "PDF";
    case "mp3":
      return "Audio";
    case "mp4":
      return "Video";
    case "png":
    case "jpg":
    case "jpeg":
      return "Image";
    case "zip":
      return "Archive";
    case "txt":
      return "Text";
    default:
      return "File";
  }
};


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
                      <li key={p.id}>
                        {p.name}{" "}
                        <button
                          className="download-btn"
                          onClick={() => handleDownload(p.id, p.name)}
                        >
                          Download {getFileTypeLabel(p.file_path)}
                        </button>
                      </li>
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
            <section id="profile" className="profile-information">
              <button
                className={`nav-item ${
                  location.hash === "#profile" || location.hash === ""
                    ? "active"
                    : ""
                }`}
                onClick={() => (window.location.hash = "profile")}
              >
                <User size={20} />
                Profile Information
              </button>
            </section>

            {!isAdmin && (
              <button
                className={`nav-item ${
                  location.hash === "#purchases" ? "active" : ""
                }`}
                onClick={() => (window.location.hash = "purchases")}
              >
                <CreditCard size={20} />
                My Purchases
              </button>
            )}

            <button
              className={`nav-item ${
                location.hash === "#settings" ? "active" : ""
              }`}
              onClick={() => (window.location.hash = "settings")}
            >
              <Settings size={20} />
              Settings
            </button>

            <button
              className={`nav-item ${
                location.hash === "#privacy" ? "active" : ""
              }`}
              onClick={() => (window.location.hash = "privacy")}
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
          {currentSection === "profile" && renderProfileTab()}
          {!isAdmin && currentSection === "purchases" && renderPurchasesTab()}
          {currentSection === "settings" && renderSettingsTab()}
          {currentSection === "privacy" && renderPrivacyTab()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage;
