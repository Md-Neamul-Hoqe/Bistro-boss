import PropTypes from "prop-types";

const SectionHeading = ({ heading, subHeading }) => {
  return (
    <div className="max-w-min whitespace-nowrap text-center mx-auto mb-10">
      <p className="font-inter italic text-xl text-yellow-600">---{subHeading}---</p>
      <h2 className="text-4xl uppercase border-y-2 py-5 px-14 mt-3">
        {heading}
      </h2>
    </div>
  );
};

SectionHeading.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default SectionHeading;
