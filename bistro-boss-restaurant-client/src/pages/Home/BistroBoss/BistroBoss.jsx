import SectionMaxWidth from "../../../components/SectionMaxWidth";
import bistroBossImg from "../../../assets/home/chef-service.jpg";
import Cover from "../../Shared/Cover/Cover";

const BistroBoss = () => {
  return (
    <SectionMaxWidth>
      <Cover
        heading={"Bistro Boss"}
        para={
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quam assumenda magnam! Maiores iure quaerat saepe deleniti? Ipsam error velit voluptas numquam labore, odit incidunt dolorem, consequatur id placeat repellat in quia cupiditate temporibus iusto ex laborum et porro! At enim aspernatur delectus cum quia aliquid exercitationem nisi hic facere."
        }
        scope={"menu"}
        img={bistroBossImg}
      />
    </SectionMaxWidth>
  );
};

export default BistroBoss;
