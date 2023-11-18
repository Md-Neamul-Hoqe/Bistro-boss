import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosHook = () => {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();
  // console.log(location);
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log("Interceptor: ", config);
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log("response: ", err?.response);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        console.error(err?.response?.status, err?.response?.data?.message);

        await userSignOut()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        navigate("/credentials/login");
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosHook;
