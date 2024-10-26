import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

type Props = {};

export default function Layout({}: Props) {
  const { logout } = useAuth();
  return (
    <div className=" min-h-screen">
      <header className="bg-white border-b shadow-sm">
        <div className="w-full sm:max-w-[700px] mx-auto p-2 sm:p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">
            <Link to={"/"}>Task App</Link>
          </h1>
          <button
            className="flex justify-center items-center underline gap-1 cursor-pointer"
            onClick={() => logout()}
          >
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </header>
      <section className="p-2 sm:p-4 w-full sm:max-w-[700px] mx-auto">
        <Outlet />
      </section>
    </div>
  );
}
