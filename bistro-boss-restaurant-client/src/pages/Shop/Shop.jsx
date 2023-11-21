import Cover from "../Shared/Cover/Cover";
import shopImg from "../../assets/shop/banner2.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import Product from "../Shared/Product/Product";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";

const Shop = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  const { category } = useParams();
  // console.log(category);

  const [tabIndex, setTabIndex] = useState(categories.indexOf(category));
  
  const [salad] = useMenu("salad");
  const [pizza] = useMenu("pizza");
  const [soup] = useMenu("soup");
  const [dessert] = useMenu("dessert");
  const [drinks] = useMenu("drinks");

  console.log(salad, pizza, soup, dessert, drinks);
  return (
    <div>
      <Cover
        heading={"Our Shop"}
        para={"Would you like to try a dish?"}
        scope={"page"}
        img={shopImg}
      />
      <Tabs
        selectedIndex={tabIndex}
        // selectedTabClassName="activeTab"
        onSelect={(index) => {
          // console.log(index);
          setTabIndex(index);
        }}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drink</Tab>
        </TabList>
        <TabPanel>
          {salad?.length ? (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {salad?.map((item) => (
                <Product key={item._id} isPrice={true} item={item} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </TabPanel>
        <TabPanel>
          {pizza?.length ? (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {pizza?.map((item) => (
                <Product key={item._id} isPrice={true} item={item} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </TabPanel>
        <TabPanel>
          {soup?.length ? (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {soup?.map((item) => (
                <Product key={item._id} isPrice={true} item={item} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </TabPanel>
        <TabPanel>
          {dessert?.length ? (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {dessert?.map((item) => (
                <Product key={item._id} isPrice={true} item={item} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </TabPanel>
        <TabPanel>
          {drinks?.length ? (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {drinks?.map((item) => (
                <Product key={item._id} isPrice={true} item={item} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </TabPanel>
      </Tabs>
      <Helmet>
        <title>Bistro Boss Restaurant | Our Shop</title>
      </Helmet>
    </div>
  );
};

export default Shop;
