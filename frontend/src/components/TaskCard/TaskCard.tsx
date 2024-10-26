import { useNavigate } from "react-router-dom";
import { deleteTaskById, updateTaskById } from "../../services/task.service";
import { taskType } from "../../types/task.type";
import Button from "../ui/Button/Button";

type Props = {
  task: taskType;
  invalidate?: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function TaskCard({ task, invalidate, setError }: Props) {
  const navigate = useNavigate();

  const handleInvalidateTask = () => {
    if (invalidate) {
      invalidate();
    }
  };

  const handleMarkAsDone = async () => {
    try {
      await updateTaskById(task._id, { done: !task.done });
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      handleInvalidateTask();
    }
  };
  const handleDelete = async () => {
    try {
      await deleteTaskById(task._id);
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      handleInvalidateTask();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
        {task.done ? (
          <span className="px-2 py-1 text-xs font-semibold rounded-md text-green-500 border border-green-500 bg-green-100">
            Done
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold rounded-md text-yellow-500 border border-yellow-500 bg-yellow-100">
            Pending
          </span>
        )}
      </div>

      <p className="mt-2 text-gray-600">{task.body}</p>

      <div className="mt-2 text-sm text-gray-500">
        <p>
          <strong>Created At:</strong>{" "}
          <span>{new Date(task.createdAt).toLocaleString()}</span>
        </p>
        <p>
          <strong>Scheduled At:</strong>{" "}
          <span>{new Date(task.scheduledAt).toLocaleString()}</span>
        </p>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button
          className=" bg-blue-500 rounded-md hover:bg-blue-600 text-white font-semibold w-auto text-xs"
          onClick={() => {
            navigate(`${task._id}/edit`);
          }}
        >
          Edit
        </Button>
        <Button
          className=" bg-red-500 rounded-md hover:bg-red-600 text-white font-semibold w-auto text-xs"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className=" bg-green-500 rounded-md hover:bg-green-600 text-white font-semibold w-auto text-xs"
          onClick={handleMarkAsDone}
        >
          {task.done ? "Mark as pending" : "Mark as done"}
        </Button>
      </div>
    </div>
  );
}
