import { z } from "zod";
import axiosInstance from "../config/axios/axios.interceptor";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { loginResponseType } from "../types/login-response.type";

export async function login(
  body: z.infer<typeof loginSchema>
): Promise<loginResponseType> {
  const response = await axiosInstance.post<loginResponseType>(
    "/auth/login",
    body
  );
  return response.data;
}

export async function register(
  body: z.infer<typeof registerSchema>
): Promise<loginResponseType> {
  const response = await axiosInstance.post<loginResponseType>(
    "/auth/register",
    body
  );
  return response.data;
}
