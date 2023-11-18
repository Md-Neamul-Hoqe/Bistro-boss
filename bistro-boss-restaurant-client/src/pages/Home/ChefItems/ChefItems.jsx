import Loading from "../../../components/Loading";
import SectionHeading from "../../../components/SectionHeading";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import useMenu from "../../../Hooks/useMenu";
import Product from "../../Shared/Product/Product";

const ChefItems = () => {
  const [menu, isLoading] = useMenu("offered");

  return (
    <SectionMaxWidth>
      <SectionHeading heading="CHEF RECOMMENDS" subHeading="Should Try" />
      {!isLoading ? (
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {menu?.length
            ? menu?.map((item) => (
                <Product key={item._id} isPrice={false} item={item} />
              ))
            : null}
        </div>
      ) : (
        <Loading />
      )}
    </SectionMaxWidth>
  );
};

export default ChefItems;
