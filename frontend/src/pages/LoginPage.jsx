import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const LoginPage = ({ addToken }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      setErrorMsg("Sva polja su obavezna.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    axios
      .post("api/login", userData)

      .then((response) => {
        if (response.data.success && response.data.user) {
          sessionStorage.setItem("auth_token", response.data.access_token);
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          window.dispatchEvent(new Event("authChanged"));
          navigate("/");
        } else {
          setErrorMsg("Neispravni podaci.");
        }
      })

      .catch((error) => {
        console.log("LOGIN ERROR:", error.response);
        setErrorMsg("Došlo je do greške prilikom prijave.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
      <div className="auth-card">
        <h3 className="auth-title">Login</h3>
        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Insert your email address"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Insert your password"
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
          No account?{" "}
          <a href="/register" className="text-primary fw-bold">
            Register
          </a>
        </p>
        <p className="text-center">
          <a href="/forgot-password" className="text-secondary">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
