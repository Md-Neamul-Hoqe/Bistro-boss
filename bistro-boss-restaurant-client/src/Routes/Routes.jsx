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
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/user-home",
        element: <Cart />,
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

      /* Admin Routs */
      {
        path: "admin-home",
        element: <Cart />,
      },
      {
        path: "add-times",
        element: <Cart />,
      },
      {
        path: "manage-times",
        element: <Cart />,
      },
      {
        path: "manage-bookings",
        element: <Cart />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
    ],
  },
]);
