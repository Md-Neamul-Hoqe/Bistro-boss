import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import { FaBook, FaCartPlus, FaDollarSign, FaUsers } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axios = useAxiosHook();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axios.get("/admin-stats");
      return res?.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl">
        Hi! {user?.displayName ? user.displayName : null} Welcome Back
      </h2>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats?.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl"/>
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats?.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
          <FaBook className="text-3xl"/>
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">${stats?.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
          <FaCartPlus className="text-3xl"/>
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">${stats?.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
