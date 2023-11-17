import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = (category) => {
  const axios = useAxiosPublic();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    try {
      axios.get("/menu").then((res) => {
        // console.log(data);

        const recommended = res?.data?.filter(
          (item) => item.category === category
        );

        setMenu(recommended);
      });
    } catch (error) {
      console.log(error);
    }
  }, [category, axios]);

  return menu;
};

export default useMenu;
