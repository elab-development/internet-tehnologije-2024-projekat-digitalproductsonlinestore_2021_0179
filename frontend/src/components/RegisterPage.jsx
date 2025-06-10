import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  }

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("api/register", userData)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
      });
  }
  return (
    <div>
      <h2>Registration</h2>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-x1-1">
        <form onSubmit={handleRegister}>
          <div className="form-outline mb-4">
            <input
              type="name"
              id="form3Example2"
              className="form-control form-control-lg"
              placeholder="Unesite name"
              name="name"
              onInput={handleInput}
            />
            <label className="form-label" htmlFor="form3Example2">
              Name
            </label>
          </div>

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
              Registruj se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
