import axios, { AxiosError } from "axios";
import globalRouter from "../globalRouter";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4747",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response && error.response.status === 401) {
      if (globalRouter.navigate) {
        globalRouter.navigate("/auth/login");
        return;
      }
    }
    throw new Error(error.response?.data?.message ?? error.message);
  }
);

export default axiosInstance;
