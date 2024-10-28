import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { taskSchema } from "../../schemas/task.schema";
import {
  addTask as addTaskApi,
  updateTaskById,
} from "../../services/task.service";
import { taskType } from "../../types/task.type";
import Alert from "../ui/Alert/Alert";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import TextAreaInputField from "../ui/TextAreaInputField/TextAreaInputField";

type Props = {
  mode?: "add" | "edit";
  task?: taskType;
};

export default function TaskForm({ mode = "add", task }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      body: task?.body ?? "",
      scheduledAt: task?.scheduledAt
        ? new Date(task.scheduledAt).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
    mode: "all",
  });
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = form;
  const navigate = useNavigate();

  const addTask = async () => {
    setLoading(true);
    try {
      const body = getValues();
      await addTaskApi(body);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };

  const editTask = async () => {
    setLoading(true);
    try {
      const body = getValues();
      await updateTaskById(task?._id as string, body);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "edit" && task) {
      editTask();
      return;
    }
    addTask();
  };

  return (
    <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Alert
        message={error}
        onClose={() => {
          setError("");
        }}
      />{" "}
      <InputField
        label="title"
        {...register("title")}
        errorMessage={errors.title?.message}
      />
      <InputField
        label="Schedule at"
        type="datetime-local"
        {...register("scheduledAt")}
        min={mode === "add" ? new Date().toISOString().slice(0, 16) : undefined}
        errorMessage={errors.scheduledAt?.message}
      />
      <TextAreaInputField
        label="body"
        {...register("body")}
        errorMessage={errors.body?.message}
      />
      <Button
        className="text-white w-full sm:w-36 text-xs"
        loading={loading}
        disabled={!isValid}
      >
        {mode}
      </Button>
    </form>
  );
}
