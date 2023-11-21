import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = (category) => {
  const axios = useAxiosPublic();
  // const { loading } = useAuth();

  // console.log(category);
  const {
    data: menu = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`menus-${category}`],
    // enabled: !loading,
    queryFn: async () => {
      const { data } = await axios.get(`/menu/?category=${category}`);

      // console.log(data);

      return data ? data : [];
    },
  });

  return [menu, isLoading, refetch];
};

export default useMenu;
