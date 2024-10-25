import Button from "../Button/Button";

type Props = {};

export default function TaskCard({}: Props) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Task Title</h2>
        {/* <span className="px-2 py-1 text-xs font-semibold rounded-md text-green-500 border border-green-500 bg-green-100">
      Done
    </span> */}
        <span className="px-2 py-1 text-xs font-semibold rounded-md text-yellow-500 border border-yellow-500 bg-yellow-100">
          Pending
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        Task description goes here. This is a brief summary of the task content.
      </p>

      <div className="mt-2 text-sm text-gray-500">
        <p>
          <strong>Created At:</strong> <span>2023-10-25</span>
        </p>
        <p>
          <strong>Scheduled At:</strong> <span>2023-10-30</span>
        </p>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button className=" bg-blue-500 rounded-md hover:bg-blue-600 text-white font-semibold w-auto text-xs">
          Edit
        </Button>
        <Button className=" bg-red-500 rounded-md hover:bg-red-600 text-white font-semibold w-auto text-xs">
          Delete
        </Button>
        <Button className=" bg-green-500 rounded-md hover:bg-green-600 text-white font-semibold w-auto text-xs">
          Mark as Done
        </Button>
      </div>
    </div>
  );
}
