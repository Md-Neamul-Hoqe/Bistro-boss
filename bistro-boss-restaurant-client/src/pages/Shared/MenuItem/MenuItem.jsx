import PropType from "prop-types";

const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;

  return (
    <div className="flex items-start">
      <figure className="max-w-[8rem] max-h-[8rem] mr-5 rounded-[100%] rounded-ss-none">
        <img
          className="rounded-[100%] rounded-ss-none w-full h-full"
          src={image}
          alt={name}
        />
      </figure>
      <div>
        <h3 className="text-xl text-black font-cinzel uppercase">
          {name} ----------------
        </h3>
        <p className="text-base text-gray-700 leading-7">{recipe}</p>
      </div>
      <div className="text-yellow-800 leading-7 text-xl">${price}</div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropType.object,
};

export default MenuItem;
