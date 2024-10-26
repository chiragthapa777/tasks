import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../../components/ui/Alert/Alert";
import Spinner from "../../../components/ui/Spinner/Spinner";
import TaskForm from "../../../components/TaskForm/TaskForm";
import { getTaskById } from "../../../services/task.service";
import { taskType } from "../../../types/task.type";

type Props = {};

export default function TaskEditPage({}: Props) {
  const [task, setTask] = useState<taskType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id]);

  const getTask = async (id: string) => {
    setLoading(true);
    try {
      const response = await getTaskById(id);
      setTask(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="my-4 text-lg font-semibold">
        Edit Task <span className="underline">{task?.title}</span>
      </h1>
      <Alert
        message={error}
        onClose={() => {
          setError("");
        }}
      />
      {loading ? (
        // loader
        <div className="h-36 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <TaskForm task={task as taskType} mode="edit" />
      )}
    </div>
  );
}
