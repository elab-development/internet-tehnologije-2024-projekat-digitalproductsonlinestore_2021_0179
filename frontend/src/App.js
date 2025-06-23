import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import MyProfilePage from "./pages/MyProfilePage";

import AdminProducts from "./pages/AdminProductsPage";
// import AdminUserOrders from "./pages/AdminUserOrders"; // kasnije
// import AdminProfile from "./pages/AdminProfile";       // kasnije

import NavBar from "./components/NavBar";
import PrivateAdminRoute from "./components/PrivateAdminRoute";


// Layout for regular users
function Layout() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAdmin = user?.email === "admin@gmail.com";

  return (
    <>
      <NavBar isAdmin={isAdmin} />
      <Outlet />
    </>
  );
}

// Layout for admin pages
function AdminLayout() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAdmin = user?.email === "admin@gmail.com";

  return (
    <>
      <NavBar isAdmin={isAdmin} />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Regular user layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<MyProfilePage />} />
        </Route>

        {/* Admin layout (protected) */}
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          {/* <Route path="orders" element={<AdminUserOrders />} /> */}
          {/* <Route path="profile" element={<AdminProfile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
