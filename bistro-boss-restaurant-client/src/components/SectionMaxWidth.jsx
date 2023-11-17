import PropTypes from "prop-types";

const SectionMaxWidth = ({ children }) => {
  return <section className="px-36">{children}</section>;
};

SectionMaxWidth.propTypes = {
  children: PropTypes.node,
};

export default SectionMaxWidth;
