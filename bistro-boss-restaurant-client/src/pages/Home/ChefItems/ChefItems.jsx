import SectionHeading from "../../../components/SectionHeading";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import useMenu from "../../../Hooks/useMenu";
import Product from "../../Shared/Product/Product";

const ChefItems = () => {
  const chef = useMenu("offered");

  return (
    <SectionMaxWidth>
      <SectionHeading heading="CHEF RECOMMENDS" subHeading="Should Try" />
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {chef?.length && chef?.map((item) => (
          <Product key={item._id} isPrice={false} item={item} />
        ))}
      </div>
    </SectionMaxWidth>
  );
};

export default ChefItems;
