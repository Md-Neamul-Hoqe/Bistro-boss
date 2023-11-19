import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";
import Loading from "../../../components/Loading";
import SectionHeading from "../../../components/SectionHeading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosHook from "../../../Hooks/useAxiosHook";

const ManageItems = () => {
  const axios = useAxiosHook();
  const [menu, isLoading, refetch] = useMenu();

  const handleDeleteItem = (item) => {
    console.log(item);
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result?.isConfirmed) {
        console.log(result);
        axios.delete(`/menu/${item?._id}`).then((res) => {
          console.log(res);

          if (res?.data?.deletedCount) {
            refetch();

            console.log("refetched");

            Swal.fire({
              icon: "success",
              title: `${item?.name} is deleted successfully!`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else
            Swal.fire({
              icon: "error",
              title: `Something wrong`,
              showConfirmButton: true,
            });
        });
      }
    });
  };

  return (
    <div>
      <SectionHeading heading="MANAGE ALL ITEMS" subHeading="Hurry Up!" />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Item Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th className="text-center" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {menu?.length
                  ? menu.map((item, idx) => {
                      return (
                        <tr key={item._id}>
                          <th>{idx + 1}</th>
                          <td>
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={item?.image} alt={item?.name} />
                              </div>
                            </div>
                          </td>
                          <td>{item?.name}</td>
                          <td>${item?.price}</td>
                          <th className="flex justify-around">
                            <Link
                              to={`/dashboard/update-item/${item?._id}`}
                              className="btn bg-orange-700 text-white text-xl">
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="btn bg-red-700 text-white text-xl">
                              <FaTrashAlt />
                            </button>
                          </th>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Item Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th className="text-center" colSpan={2}>
                    Action
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
