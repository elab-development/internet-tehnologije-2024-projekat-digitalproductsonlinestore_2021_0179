import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const Login = ({ addToken }) => {
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
        if (response.data.success) {
          sessionStorage.setItem("auth_token", response.data.access_token);
          addToken(response.data.access_token);
          navigate("/");
        } else {
          setErrorMsg("Neispravni podaci.");
        }
      })
      .catch(() => {
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
              Email adresa
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Unesite email"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Lozinka
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Unesite lozinku"
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-button"
            disabled={loading}
          >
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </button>
        </form>
        <p className="text-center mt-3">
          Nemate nalog?{" "}
          <a href="/register" className="text-primary fw-bold">
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
