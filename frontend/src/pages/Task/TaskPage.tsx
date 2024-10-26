import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAuth } from "../../providers/AuthProvider";
import { getTasks as getTasksApi } from "../../services/task.service";
import { paginationQuery } from "../../types/pagination-query.type";
import { taskType } from "../../types/task.type";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import { useDebounce } from "../../hooks/use-debounce/useDebounce";

type Props = {};

export default function TaskPage({}: Props) {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<paginationQuery>({
    limit: 10,
    page: 1,
    search: "",
    sortBy: "createdAt",
    sortDirection: "desc",
    totalPage: 1,
  });
  const { user } = useAuth();
  const sortValue = useMemo(
    () => `${pagination.sortBy},${pagination.sortDirection}`,
    [pagination.sortBy, pagination.sortDirection]
  );
  const debouncedSearch = useDebounce(pagination.search, 1000);

  useEffect(() => {
    getTasks();
  }, [sortValue, pagination.page, debouncedSearch, pagination.limit]);

  const setSortValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || "createdAt,desc";
    const splitValue = value.split(",");
    const sortBy: string = splitValue[0];
    const sortDirection: "desc" | "asc" =
      splitValue[1] === "desc" ? "desc" : "asc";
    setPagination((value) => ({ ...value, sortBy, sortDirection }));
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasksApi(pagination);
      setTasks(data.data);
      setPagination((pagination) => ({
        ...pagination,
        totalPage: data.paginationMeta.totalPage,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-2 sm:gap-3">
      <Alert
        message={error}
        onClose={() => {
          setError("");
        }}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg">
          Welcome,{" "}
          <span className="font-semibold capitalize">{user?.name}</span>
        </h3>
        <Button className="text-white w-auto text-xs">
          <Link to={"/add"}>Add Task</Link>
        </Button>
      </div>
      <div className="flex gap-2  justify-between items-center ">
        <div className="search_bar border rounded-md p-2 max-w-48 flex flex-1">
          <input
            type="text"
            className="w-full outline-none text-xs"
            placeholder="Search ..."
            value={pagination.search}
            onChange={(e) => {
              setPagination((pagination) => ({
                ...pagination,
                search: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <div className="flex justify-center items-center gap-2 text-sm">
            <label htmlFor="">Sort By :</label>
            <select
              name=""
              id=""
              className="border rounded-md p-2 flex text-xs"
              value={sortValue}
              onChange={setSortValue}
            >
              <option value="createdAt,desc">Newest First</option>
              <option value="createdAt,asc">Oldest First</option>
              <option value="scheduledAt,desc">Latest Scheduled</option>
              <option value="scheduledAt,asc">Earliest Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        // loader
        <div className="h-36 flex justify-center items-center">
          <Spinner />
        </div>
      ) : tasks.length > 0 ? (
        // task list
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {" "}
          {tasks.map((task) => (
            <li key={task._id}>
              <TaskCard
                task={task}
                invalidate={() => {
                  getTasks();
                }}
                setError={setError}
              />
            </li>
          ))}
        </ul>
      ) : (
        // no task found
        <div className="h-36 flex justify-center items-center">
          <p>
            Not task found, click{" "}
            <Link to={"/add"} className="underline cursor-pointer">
              here
            </Link>{" "}
            to create task
          </p>
        </div>
      )}

      {/* Pagination */}
      {tasks.length > 0 && (
        <Pagination
          totalPages={pagination.totalPage ?? 1}
          currentPage={pagination.page ?? 1}
          setPagination={setPagination}
        />
      )}
    </div>
  );
}
