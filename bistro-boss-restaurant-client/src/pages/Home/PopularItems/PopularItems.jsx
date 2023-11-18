import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import Button from "../../../components/Button";
import useMenu from "../../../Hooks/useMenu";

const PopularItems = () => {
  const menu = useMenu("popular");

  /* menus need to be dynamic [get from props] */
  // useEffect(() => {
  //   axios.get("/menu").then((res) => {
  //     // console.log(data);
  //     const { data } = res;

  //     const popular = data.filter((item) => item.category === );

  //     setMenu(popular);
  //   });
  // }, [axios]);

  return (
    <SectionMaxWidth>
      <SectionHeading heading="Check it out" subHeading="FROM OUR MENU" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
        {menu?.length > 6
          ? menu
              .slice(0, 6)
              .map((item) => <MenuItem key={item._id} item={item} />)
          : menu.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
      <div className="block text-center mb-20">
        <Button text="View Full Menu" color="black" url="/our-menu" />
      </div>
    </SectionMaxWidth>
  );
};

export default PopularItems;
