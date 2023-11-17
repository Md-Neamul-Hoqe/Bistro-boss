import PropTypes from "prop-types";

const Cover = ({ heading, para, scope, img }) => {
  // console.log(img);

  return (
    <section
      style={{
        backgroundImage: `url(${img})`,
        backgroundAttachment: `${scope === "menu" ? "fixed" : "unset"}`,
        padding: "138px",
        marginBottom: "130px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: scope === "menu" ? "auto" : "100vh",
      }}>
      <div
        className={`flex flex-col items-center justify-center p-16 ${
          scope === "menu"
            ? "bg-white text-black"
            : "bg-black text-white bg-opacity-70 py-32"
        }`}>
        <h2
          className={`text-5xl mb-5 ${
            scope === "menu" ? "" : "font-cinzel text-8xl font-bold"
          }`}>
          {heading}
        </h2>
        <p
          className={`leading-7 text-justify ${
            scope === "menu" ? "" : "font-cinzel text-2xl font-semibold"
          }`}>
          {para}
        </p>
      </div>
    </section>
  );
};

Cover.propTypes = {
  heading: PropTypes.string,
  para: PropTypes.string,
  scope: PropTypes.string,
  img: PropTypes.string,
};

export default Cover;
