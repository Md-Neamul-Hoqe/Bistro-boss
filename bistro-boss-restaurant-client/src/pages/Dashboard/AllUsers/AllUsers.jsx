import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axios = useAxiosHook();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      //   console.log(res.data);
      return res?.data;
    },
  });

  //   console.log(users);
  const handleDeleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/users/${id}`).then((res) => {
          console.log(res);

          if (res?.data?.deletedCount) {
            refetch();

            console.log("refetched");

            Swal.fire({
              icon: "success",
              title: `Deleted from your cart`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else
            Swal.fire({
              icon: "error",
              title: `Something wrong`,
              showConfirmButton: false,
              timer: 2000,
            });
        });
      }
    });
  };

  const handleUserRole = (user) => {
    console.log(user);

    Swal.fire({
      title: "Are you sure to update?",
      //   text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Change",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/users/admin/${user?._id}`).then((res) => {
          console.log(res);

          if (res?.data?.modifiedCount) {
            refetch();

            console.log("refetched");

            Swal.fire({
              icon: "success",
              title: `${user?.name} is an admin now!`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else
            Swal.fire({
              icon: "error",
              title: `Something wrong`,
              showConfirmButton: false,
              timer: 2000,
            });
        });
      }
    });
  };
  
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-4xl">All Users</h2>
        <h2 className="text-4xl">Total Users: {users?.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.length
                ? users.map((user, idx) => {
                    return (
                      <tr key={user._id}>
                        <th>{idx + 1}</th>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>
                          {user?.role === "admin" ? (
                            <span className="text-blue-600 font-bold">
                              Admin
                            </span>
                          ) : (
                            <button
                              onClick={() => handleUserRole(user)}
                              className="btn btn-sm bg-orange-600 text-white">
                              <FaUsers />
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="btn bg-red-700 text-white btn-sm">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
