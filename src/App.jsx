import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/auth/user/Dashboard.jsx";
import AdminDashboard from "./pages/auth/admin/Dashboard.jsx";
import AdminCategory from "./pages/auth/admin/Category.jsx";
import AdminProduct from "./pages/auth/admin/Product.jsx";
import AdminProducts from "./pages/auth/admin/Products.jsx";
import AdminProductUpdate from "./pages/auth/admin/ProductUpdate.jsx";
import Shop from "./pages/Shop.jsx";
import Search from "./pages/Search.jsx";
import CategoryView from "./pages/CategoryVeiw.jsx";
import ProductView from "./pages/ProductView.jsx";
import UserProfile from "./pages/auth/user/Profile.jsx";
import UserOders from "./pages/auth/user/Oders.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/auth/admin/Orders.jsx";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not Found
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Category/:slug" element={<CategoryView />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Product/:slug" element={<ProductView />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/oders" element={<UserOders />} />
          </Route>

          <Route path="/Dashboard" element={<AdminRoute />}>
            {" "}
            {/*this route is protected by signing in and being administrator*/}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/Orders" element={<Orders />} />
            <Route
              path="admin/product/update/:slug"
              element={<AdminProductUpdate />}
            />

            
          </Route>

          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}
