import axios, { AxiosError } from "axios";
import globalRouter from "../globalRouter";

const axiosInstance = axios.create({
  baseURL: "localhost:4747",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (globalRouter.navigate) {
        globalRouter.navigate("/auth/login");
      }
    }
  }
);

export default axiosInstance;
