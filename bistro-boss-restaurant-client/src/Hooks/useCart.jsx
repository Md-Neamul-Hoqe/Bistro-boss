import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "./useAxiosHook";
import useAuth from "./useAuth";

const useCart = () => {
  const axios = useAxiosHook();
  const { user } = useAuth();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      try {
        const res =
          user?.email && (await axios.get(`/carts?email=${user?.email}`));

        return res?.data || [];
      } catch (error) {
        console.log(error);
      }
      return [];
    },
  });

  return [cart, refetch];
};

export default useCart;
