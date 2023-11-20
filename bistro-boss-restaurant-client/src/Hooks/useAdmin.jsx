import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosHook from "./useAxiosHook";
const useAdmin = () => {
  const { user, loading } = useAuth();

  const axios = useAxiosHook();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user) {
        const res = await axios.get(`/user/admin/${user?.email}`);

        return res?.data?.admin;
      }
      return false;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
