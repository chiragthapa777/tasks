import TaskForm from "../../../components/TaskForm/TaskForm";

type Props = {};

export default function TaskAddPage({}: Props) {
  return (
    <div>
      <h1 className="my-4 text-lg font-semibold">Create a Task</h1>
      <TaskForm />
    </div>
  );
}
