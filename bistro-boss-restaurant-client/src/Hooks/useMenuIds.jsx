import useAxiosHook from "./useAxiosHook";
import { useQuery } from "@tanstack/react-query";

const useMenuIds = (menuItems) => {
  const axios = useAxiosHook();

  //   console.log("menus: ", menuItems);

  const ids = menuItems?.map((item) => item?.menuId);
  const { data: menu = [] } = useQuery({
    queryKey: ["cartMenu", menuItems],
    queryFn: async () => {
      try {
        const res = await axios.get(`/menu`);

        if (res?.data) {
          const menuOfIds = res?.data?.filter((item) => {
            if (ids.includes(item._id)) return item;
          });

          // console.log("Menus In Cart: ", menuOfIds);
          return menuOfIds;
        }
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  return menu;
};

export default useMenuIds;
