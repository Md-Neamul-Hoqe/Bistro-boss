import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://bistro-boss-restaurant-server-blond.vercel.app",
  // withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
