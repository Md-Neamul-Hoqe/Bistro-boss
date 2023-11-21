import useAxiosHook from "./useAxiosHook";
import { useQuery } from "@tanstack/react-query";

/* Menu ids from cart */
const useMenuIds = (menuItems) => {
  const axios = useAxiosHook();
  // console.log("Menu items in cart: ", menuItems);

  const menuIds = menuItems?.map((item) => item?.menuId);
  const { data: menu = [] } = useQuery({
    queryKey: ["cartMenu", menuItems],
    queryFn: async () => {
      try {
        /* TODO: get only cart menus not all menus */
        const res = await axios.get(`/menu`);

        if (res?.data?.length) {
          // console.log("menu items: ", menuIds);

          const menuOfIds = res?.data?.filter((item) => {
            if (menuIds.includes(item._id)) return item;
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

  console.log("The menu in cart: ", menu);
  return menu;
};

export default useMenuIds;
