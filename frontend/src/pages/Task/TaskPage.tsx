import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAuth } from "../../providers/AuthProvider";

type Props = {};

export default function TaskPage({}: Props) {
  const { user } = useAuth();
  return (
    <div className=" flex flex-col gap-2 sm:gap-3">
      <h3 className="text-lg">
        Welcome to Task App,{" "}
        <span className="font-semibold capitalize">{user?.name}</span>
      </h3>
      <div className="flex gap-2  justify-between items-center ">
        <div className="search_bar border rounded-md p-2 max-w-48 flex flex-1">
          <input
            type="text"
            className="w-full outline-none text-xs"
            placeholder="Search ..."
          />
        </div>
        <div>
          <div className="flex justify-center items-center gap-2 text-sm">
            <label htmlFor="">Sort By :</label>
            <select
              name=""
              id=""
              className="border rounded-md p-2 flex text-xs"
            >
              <option value="createdAt,desc">Newest First</option>
              <option value="createdAt,asc">Oldest First</option>
              <option value="scheduledAt,desc">Latest Scheduled</option>
              <option value="scheduledAt,asc">Earliest Scheduled</option>
            </select>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <li>
          <TaskCard />
        </li>
        <li>
          <TaskCard />
        </li>
        <li>
          <TaskCard />
        </li>
        <li>
          <TaskCard />
        </li>
      </ul>
      <Pagination totalPages={4} />
    </div>
  );
}
