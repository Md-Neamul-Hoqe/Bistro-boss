import featuredImg from "../../../assets/home/featured.jpg";
import Button from "../../../components/Button";
import SectionHeading from "../../../components/SectionHeading";
import SectionMaxWidth from "../../../components/SectionMaxWidth";

const Featured = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${featuredImg})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}>
      <div className="bg-opacity-60 bg-black w-full h-full mb-20 py-20 text-white">
        <SectionMaxWidth>
          <SectionHeading heading="Check it out" subHeading="featured item" />
          <div className="flex items-center gap-16">
            <figure>
              <img src={featuredImg} alt="" />
            </figure>
            <div className="space-y-5">
              <h4 className="leading-9 text-2xl">March 20, 2023</h4>
              <h3 className="uppercase leading-9 text-2xl">
                WHERE CAN I GET SOME?
              </h3>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptate facere, deserunt dolores maiores quod nobis quas
                quasi. Eaque repellat recusandae ad laudantium tempore
                consequatur consequuntur omnis ullam maxime tenetur.
              </p>
              <Button url={`/featured-item/`} text="Read more" color="white" />
            </div>
          </div>
        </SectionMaxWidth>
      </div>
    </div>
  );
};

export default Featured;
