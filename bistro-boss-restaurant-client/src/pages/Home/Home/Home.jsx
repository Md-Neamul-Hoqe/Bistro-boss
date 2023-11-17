import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BistroBoss from "../BistroBoss/BistroBoss";
import Category from "../Category/Category";
import ChefItems from "../ChefItems/ChefItems";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../Featured/Featured";
import PopularItems from "../PopularItems/PopularItems";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <BistroBoss />
      <PopularItems />
      <ContactUs />
      <ChefItems />
      <Featured />
      <Testimonials />
      <Helmet>
        <title>Bistro Boss Restaurant | Home</title>
      </Helmet>
    </div>
  );
};

export default Home;
