import {
  FaBook,
  FaBookmark,
  FaCalendarAlt,
  FaCcPaypal,
  FaCommentDots,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "./Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <section className="flex min-h-screen">
      <aside className="w-64 min-h-full bg-orange-400 capitalize">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/admin-home">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/add-item">
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/manage-items">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/manage-bookings">
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/all-users">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/user-home">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt />
                  Reservation
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/payment-history">
                  <FaCcPaypal />
                  Payment history
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart />
                  My Cart
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/add-review">
                  <FaCommentDots />
                  Add Review
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/dashboard/bookings">
                  <FaBookmark />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="divider divide-solid divide-neutral-50"></div>
        <ul className="menu p-4">
          <li style={{ fontVariantCaps: "small-caps" }}>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li style={{ fontVariantCaps: "small-caps" }}>
            <NavLink to="/our-menu">
              <FaList />
              Menu
            </NavLink>
          </li>
          <li style={{ fontVariantCaps: "small-caps" }}>
            <NavLink to="/our-shop/salad">
              <FaShoppingBag />
              Shop
            </NavLink>
          </li>
          <li style={{ fontVariantCaps: "small-caps" }}>
            <NavLink to="/our-shop/salad">
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </aside>
      <aside className="flex-1 p-8">
        <Outlet />
      </aside>
    </section>
  );
};

export default Dashboard;
