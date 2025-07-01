import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent to your email.");

      // Automatski preusmeri nakon poruke
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      console.error("Reset error:", err);
      setErrorMsg("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => navigate("/login")}>
        ← Back
      </button>
      <div className="auth-card">
        <h3 className="auth-title">Forgot Password</h3>
        {message && <div className="auth-success">{message}</div>}
        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-button"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
