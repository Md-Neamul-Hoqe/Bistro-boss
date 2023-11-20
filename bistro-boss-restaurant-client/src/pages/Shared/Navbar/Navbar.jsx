import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        userSignOut()
          .then((res) => {
            if (!res) {
              Swal.fire({
                title: "Sign Out",
                text: "Sign Out successfully.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const navs = (
    <>
      <li>
        <NavLink to="/" className="uppercase font-extrabold text-lg">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className="uppercase font-extrabold text-lg">
          Contact us
        </NavLink>
      </li>
      <li>
        <NavLink to="/our-menu" className="uppercase font-extrabold text-lg">
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/our-shop/salad"
          className="uppercase font-extrabold text-lg">
          Our Shop
        </NavLink>
      </li>
      {user || isAdmin ? (
        <>
          <li>
            <NavLink
              to={
                user && isAdmin
                  ? "/dashboard/admin-home"
                  : "/dashboard/user-home"
              }
              className="uppercase font-extrabold text-lg">
              Dashboard
            </NavLink>
          </li>
          {user ? (
            <li>
              <Link to="/dashboard/cart" className="indicator">
                <FaCartPlus className="text-3xl" />
                <div className="indicator-item badge-xs badge-secondary rounded-badge">
                  +{cart?.length}
                </div>
              </Link>
            </li>
          ) : null}
        </>
      ) : null}
    </>
  );

  return (
    <nav className="navbar bg-black bg-opacity-25 py-6 px-14 fixed text-white z-50 max-w-screen-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black/80 rounded w-52">
            {navs}
          </ul>
        </div>
        <a className="uppercase">
          <h1 className="text-[2rem] font-black font-cinzel">BISTRO BOSS</h1>
          <h5 className="text-2xl font-bold tracking-[.3em] font-cinzel">
            Restaurant
          </h5>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navs}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div className="flex items-center gap-2">
            <div className="avatar mx-1">
              <div className="w-10 rounded-full ring ring-orange-600 ring-offset-base-100 ring-offset-2">
                <img
                  className="w-full"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            </div>
            <span>{user?.displayName || user.email.split("@")[0]}</span>
            <button
              onClick={handleLogOut}
              className="font-extrabold text-lg btn capitalize">
              sign out
            </button>
          </div>
        ) : (
          <NavLink
            to="/credentials/login"
            className="font-extrabold text-lg capitalize">
            sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
