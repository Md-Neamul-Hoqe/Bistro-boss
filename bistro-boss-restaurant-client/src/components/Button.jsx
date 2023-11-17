import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ text, color, url, item, handleAddToCart }) => {
  // console.log({ text, color, url, item, handleAddToCart });
  return (
    <>
      {url ? (
        <Link
          to={url}
          className={`btn border-0 border-b-2 rounded-md border-b-solid hover:border-none hover:bg-black capitalize ${
            color === "black"
              ? "bg-white border-b-black hover:text-white"
              : color === "white"
              ? "bg-transparent border-b-white text-white"
              : "bg-base-300 border-[#BB8506] text-[#BB8506]"
          }`}>
          {text}
        </Link>
      ) : (
        <button
          onClick={() => handleAddToCart(item)}
          className={`btn border-0 border-b-2 rounded-md border-b-solid hover:border-none hover:bg-black capitalize ${
            color === "black"
              ? "bg-white border-b-black hover:text-white"
              : color === "white"
              ? "bg-transparent border-b-white text-white"
              : "bg-base-300 border-[#BB8506] text-[#BB8506]"
          }`}>
          {text}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  item: PropTypes.object,
  handleAddToCart: PropTypes.func,
};
export default Button;
