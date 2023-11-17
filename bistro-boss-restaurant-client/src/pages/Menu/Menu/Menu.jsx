import { Helmet } from "react-helmet-async";
import menuImg from "../../../assets/home/banner.jpg";
import dessertsImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import Cover from "../../Shared/Cover/Cover";
import MenuCategory from "../../Shared/MenuCategory/MenuCategory";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";

const Menu = () => {
  return (
    <div>
      <Cover
        heading={"OUR MENU"}
        para={"Would you like to try a dish?"}
        scope={"page"}
        img={menuImg}
      />
      <SectionHeading heading={"TODAY'S OFFER"} subHeading={"Don't miss"} />
      <MenuCategory category={"offered"} />
      <div className="text-center mb-10">
        <Button
          url={`/our-shop/drinks`}
          text={"ORDER YOUR FAVOURITE FOOD"}
          color={"black"}
        />
      </div>

      <Cover
        heading={"Desserts"}
        para={
          "Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        scope={"page"}
        img={dessertsImg}
      />

      <MenuCategory category={"dessert"} />

      <div className="text-center mb-10">
        <Button
          url={`/our-shop/dessert`}
          text={"ORDER YOUR FAVOURITE FOOD"}
          color={"black"}
        />
      </div>

      <Cover
        heading={"Pizza"}
        para={
          "Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        scope={"page"}
        img={pizzaImg}
      />

      <MenuCategory category={"pizza"} />

      <div className="text-center mb-10">
        <Button
          url={`/our-shop/pizza`}
          text={"ORDER YOUR FAVOURITE FOOD"}
          color={"black"}
        />
      </div>

      <Cover
        heading={"salads"}
        para={
          "Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        scope={"page"}
        img={saladImg}
      />

      <MenuCategory category={"salad"} />

      <div className="text-center mb-10">
        <Button
          url={`/our-shop/salad`}
          text={"ORDER YOUR FAVOURITE FOOD"}
          color={"black"}
        />
      </div>

      <Cover
        heading={"soups"}
        para={
          "Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        scope={"page"}
        img={soupImg}
      />

      <MenuCategory category={"soup"} />

      <div className="text-center mb-10">
        <Button
          url={`/our-shop/soup`}
          text={"ORDER YOUR FAVOURITE FOOD"}
          color={"black"}
        />
      </div>

      <Helmet>
        <title>Bistro Boss Restaurant | Our Menu</title>
      </Helmet>
    </div>
  );
};

export default Menu;
