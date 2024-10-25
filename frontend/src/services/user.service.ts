import axiosInstance from "../config/axios/axios.interceptor";
import { loginResponseType } from "../types/login-response.type";

export async function login(body: {
  email: string;
  password: string;
}): Promise<loginResponseType> {
  const response = await axiosInstance.post<loginResponseType>(
    "/auth/login",
    body
  );
  return response.data;
}
