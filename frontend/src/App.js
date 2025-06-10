import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProductsPage from "./components/ProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import {useState} from "react";


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
        <Route path="/" element={<NavBar token={token}/>} >
          <Route path="products" element={<ProductsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
