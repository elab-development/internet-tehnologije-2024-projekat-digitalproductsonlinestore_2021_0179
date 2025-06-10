import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({addToken}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    //console.log(newUserData);
    setUserData(newUserData);
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          window.sessionStorage.setItem("auth_token", response.data.access_token);
          addToken(response.data.access_token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  }
  return (
    <div>
      <h2>Prijava</h2>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-x1-1">
        <form onSubmit={handleLogin}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form3Example3"
              className="form-control form-control-lg"
              placeholder="Unesite email"
              name="email"
              onInput={handleInput}
            />
            <label className="form-label" htmlFor="form3Example3">
              Email address
            </label>
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="form3Example4"
              className="form-control form-control-lg"
              placeholder="Unesite lozinku"
              name="password"
              onInput={handleInput}
            />
            <label className="form-label" htmlFor="form3Example4">
              Password
            </label>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg">
              Prijavi se
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account?{" "}
              <a href="/register" className="link-danger">
                Registrujte se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
