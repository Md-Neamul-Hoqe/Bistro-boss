import PropTypes from "prop-types";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import useMenu from "../../../Hooks/useMenu";
import MenuItem from "../MenuItem/MenuItem";
import Loading from "../../../components/Loading";

const MenuCategory = ({ category }) => {
  const menu = useMenu(category);
  return (
    <SectionMaxWidth>
      {menu?.length ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </SectionMaxWidth>
  );
};

MenuCategory.propTypes = {
  category: PropTypes.string,
};

export default MenuCategory;
