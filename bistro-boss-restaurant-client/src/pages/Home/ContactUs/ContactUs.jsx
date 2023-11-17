import SectionMaxWidth from "../../../components/SectionMaxWidth";

const ContactUs = () => {
  return (
    <SectionMaxWidth>
      <div className="bg-black flex items-center justify-center text-white text-5xl w-full h-60 mb-20">
        Call Us:{" "}
        <span className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white my-24 oldstyle-nums font-raleway">
          +88 0192345678910
        </span>
      </div>
    </SectionMaxWidth>
  );
};

export default ContactUs;
