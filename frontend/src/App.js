import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import {useState} from "react";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import { Outlet } from "react-router-dom";

function Layout({ token }) {
  return (
    <>
      <NavBar token={token} />
      <Outlet />
    </>
  );
}
function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem("auth_token"));
  function addToken(auth_token){
    setToken(auth_token);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage addToken={addToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<Layout token={token} />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
