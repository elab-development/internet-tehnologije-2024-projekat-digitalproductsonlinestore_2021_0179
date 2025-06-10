import axios from "axios";
import { Outlet } from "react-router-dom";

const NavBar = ({ token }) => {
  function handleLogout() {
    var config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.removeItem("auth_token");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse show"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="/products">
                All Products
              </a>
              {token == null ? (
                <a className="nav-link" href="/login">
                  Login
                </a>
              ) : (
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              )}
              <a className="nav-link" href="#">
                Pricing
              </a>
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
