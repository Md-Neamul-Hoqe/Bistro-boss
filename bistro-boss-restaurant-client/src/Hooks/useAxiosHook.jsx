import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxiosHook = () => {
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
    (err) => {
      console.log("response: ", err.response);
      if (err.response.status === 401 || err.response.status === 403)
        console.log("Unauthorized user.");
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosHook;
