import PropTypes from "prop-types";
import Button from "../../../components/Button";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import useCart from "../../../Hooks/useCart";

const Product = ({ isPrice, item }) => {
  const axios = useAxiosHook();
  const { user } = useAuth();
  const [, refetch] = useCart();

  // console.log(item, isPrice);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    // console.log(this.preventDefault());
    if (!user || !user?.email) {
      Swal.fire({
        title: "Your are not logged in.",
        text: "Logging Now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log-in",
      }).then((result) => {
        if (result?.isConfirmed) {
          navigate("/credentials/login", { state: { from: location } });
        }
      });
    } else {
      // console.log(item);

      const cartItem = {
        menuId: item?._id,
        email: user?.email,
      };

      axios
        .post("/carts", cartItem)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "center-end",
            icon: "success",
            title: `${item.name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });

          // to updated the client site cart item count
          refetch();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div key={item._id} className="card bg-base-200 rounded-none">
      <figure className="p-0">
        <img src={item.image} alt={item.name} className="rounded-none w-full" />
        {isPrice ? (
          <div className="absolute z-20 bg-black right-5 top-5 text-white px-5 py-2 text-base font-semibold leading-7">
            ${item.price}
          </div>
        ) : null}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="text-black font-semibold text-2xl capitalize">
          {item.name}
        </h2>
        <p className="leading-7 py-5">{item.recipe}</p>
        <div className="card-actions">
          <Button
            handleAddToCart={handleAddToCart}
            item={item}
            text="Add to cart"
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  isPrice: PropTypes.bool,
  item: PropTypes.object,
};

export default Product;
