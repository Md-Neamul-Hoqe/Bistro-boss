import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionHeading from "../../../components/SectionHeading";
import SectionMaxWidth from "../../../components/SectionMaxWidth";

const Category = () => {
  return (
    <SectionMaxWidth>
      <SectionHeading
        heading={"ORDER ONLINE"}
        subHeading={"From 11:00am to 10:00pm"}
      />

      <Swiper
        modules={[Pagination]}
        spaceBetween={15}
        slidesPerView={4}
        pagination={{ clickable: true }}
        className="mb-24">
        <SwiperSlide>
          <img src={slide1} alt="slides" />
          <h3 className="text-4xl uppercase text-center text-white drop-shadow-2xl absolute bottom-8 w-full">
            Salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="slides" />
          <h3 className="text-4xl uppercase text-center text-white drop-shadow-2xl absolute bottom-8 w-full">
            Pizza
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="slides" />
          <h3 className="text-4xl uppercase text-center text-white drop-shadow-2xl absolute bottom-8 w-full">
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="slides" />
          <h3 className="text-4xl uppercase text-center text-white drop-shadow-2xl absolute bottom-8 w-full">
            Desserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="slides" />
          <h3 className="text-4xl uppercase text-center text-white drop-shadow-2xl absolute bottom-8 w-full">
            Salads
          </h3>
        </SwiperSlide>
      </Swiper>
    </SectionMaxWidth>
  );
};

export default Category;
