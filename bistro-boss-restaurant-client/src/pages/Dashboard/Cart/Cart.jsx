import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useMenuIds from "../../../Hooks/useMenuIds";
import Swal from "sweetalert2";
import useAxiosHook from "../../../Hooks/useAxiosHook";

const Cart = () => {
  const axios = useAxiosHook();
  const [cart, refetch] = useCart();
  const menu = useMenuIds(cart);
  const totalItems = cart?.length;

  // console.log(cart, menu);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete ?",
      text: "Con't revert anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/carts/${id}`).then((res) => {
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

  return (
    <div>
      <div className="flex justify-evenly">
        <h1 className="text-4xl">Total Orders: {totalItems}</h1>
        <h1 className="text-4xl">
          Total Price: $
          {totalItems && menu?.reduce((sum, item) => sum + item?.price, 0)}
        </h1>
        <button className="btn bg-orange-400 text-white">Pay</button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-orange-700">
                <th></th>
                <th className="uppercase text-white">item image</th>
                <th className="uppercase text-white">item name</th>
                <th className="uppercase text-white">price</th>
                <th className="uppercase text-white">action</th>
              </tr>
            </thead>
            <tbody>
              {menu?.length
                ? menu?.map((item, idx) => (
                    <tr key={item._id}>
                      <th>{idx + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item?.image} alt={item?.name} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{item?.name}</div>
                        </div>
                      </td>
                      <td>${item?.price || "Free"}</td>
                      <th>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn bg-orange-700 text-white btn-sm">
                          <FaTrashAlt />
                        </button>
                      </th>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
