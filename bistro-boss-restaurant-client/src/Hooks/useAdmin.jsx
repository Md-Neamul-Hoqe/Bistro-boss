import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosHook from "./useAxiosHook";
const useAdmin = () => {
  const { user } = useAuth();

  const axios = useAxiosHook();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/user/admin/${user?.email}`);
      console.log(res?.data);
      return res?.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
