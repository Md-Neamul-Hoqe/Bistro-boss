import SectionHeading from "../../../components/SectionHeading";
import SectionMaxWidth from "../../../components/SectionMaxWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const Testimonials = () => {
  const axios = useAxiosPublic();
  // const [comments, setComments] = useState([]);
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get("/reviews");
      return res?.data;
    },
  });

  // console.log(comments);

  return (
    <SectionMaxWidth>
      <SectionHeading
        heading="TESTIMONIALS"
        subHeading="What Our Clients Say"
      />

      <div className="mb-20">
        {isLoading || comments?.length ? (
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {comments?.map((comment) => (
              <SwiperSlide key={comment._id}>
                <div className="flex flex-col items-center text-center px-20">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={comment.rating}
                    itemStyles={{
                      itemShapes: RoundedStar,
                      activeFillColor: "#CD9003",
                      activeStrokeColor: "gray",
                      inactiveFillColor: "gray",
                      inactiveStrokeColor: "LightSeaGreen",
                    }}
                    readOnly
                  />
                  <FaQuoteLeft className="text-6xl m-5" />
                  <p className="leading-8 text-xl text-black/80 mb-2">
                    {comment.details}
                  </p>
                  <h3 className="text-yellow-600 font-medium text-3xl uppercase">
                    {comment.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loading />
        )}
      </div>
    </SectionMaxWidth>
  );
};

export default Testimonials;
