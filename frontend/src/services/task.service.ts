import axiosInstance from "../config/axios/axios.interceptor";
import { taskSchema } from "../schemas/task.schema";
import { paginationQuery } from "../types/pagination-query.type";
import { IPagination } from "../types/pagination.interface";
import { taskType } from "../types/task.type";
import { objectToQueryString } from "../utils/objectToQueryString";
import { z } from "zod";

export const getTasks = async (query: paginationQuery) => {
  const response = await axiosInstance.get<IPagination<taskType>>(
    "/tasks" + objectToQueryString(query)
  );
  return response.data;
};

export const addTask = async (body: z.infer<typeof taskSchema>) => {
  const response = await axiosInstance.post<IPagination<taskType>>(
    "/tasks",
    body
  );
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axiosInstance.get<taskType>("/tasks/" + id);
  return response.data;
};

export const updateTaskById = async (id: string, body: Partial<taskType>) => {
  const response = await axiosInstance.put<taskType>("/tasks/" + id, body);
  return response.data;
};

export const deleteTaskById = async (id: string) => {
  const response = await axiosInstance.delete<taskType>("/tasks/" + id);
  return response.data;
};
