import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/userlist"
        element={
          <AdminRoute>
            <UserList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categorylist"
        element={
          <AdminRoute>
            <CategoryList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/productlist/:pageNumber"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/allproductslist"
        element={
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/product/update/:_id"
        element={
          <AdminRoute>
            <ProductUpdate />
          </AdminRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
