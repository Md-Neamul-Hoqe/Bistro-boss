import { useEffect, useState } from "react";
import SectionHeading from "../../../components/SectionHeading";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import Button from "../../../components/Button";

const PopularItems = () => {
  const [menu, setMenu] = useState([]);
  const [three, setThree] = useState(6);

  /* menus need to be dynamic [get from props] */
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const popular = data.filter((item) => item.category === "popular");

        setMenu(popular);
      });
  }, []);
  return (
    <SectionMaxWidth>
      <SectionHeading heading="Check it out" subHeading="FROM OUR MENU" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
        {menu?.length > 6
          ? menu
              .slice(0, three)
              .map((item) => <MenuItem key={item._id} item={item} />)
          : menu.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
      <div className="block text-center mb-20">
        <Button
          // url={`/our-shop`}
          text="View Full Menu"
          color="black"
          onClick={() => setThree(menu.length)}
        />
      </div>
    </SectionMaxWidth>
  );
};

export default PopularItems;
