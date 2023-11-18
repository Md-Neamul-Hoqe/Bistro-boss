import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Credentials/Login";
import Register from "../pages/Credentials/Register";
import Credentials from "../pages/Credentials/Credentials";
import Dashboard from "../Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "our-menu",
        element: <Menu />,
      },
      {
        path: "our-shop/:category",
        element: <Shop />,
      },
      {
        path: "logout",
        element: <Login />,
      },
    ],
  },
  {
    path: "/credentials",
    element: <Credentials />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "user-home",
        element: <UserHome />,
      },
      {
        path: "reservation",
        element: <Cart />,
      },
      {
        path: "payment-history",
        element: <Cart />,
      },
      {
        path: "add-review",
        element: <Cart />,
      },
      {
        path: "bookings",
        element: <Cart />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

      /* Admin Routes */
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-item",
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <Cart />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
