import { Link } from "react-router-dom";
import LoginForm from "../../../components/LoginForm/LoginForm";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="border p-4 min-w-80 rounded-md shadow-md bg-white">
        <div className="my-3">
          <h1 className="text-xl font-bold mb-1">Login</h1>
          <p className="text-gray-500 text-sm">
            Enter your email below to login to Task App
          </p>
        </div>
        <LoginForm />
        <div className=" text-center my-3">
          <p className="text-sm text-gray-500">
            New to Task App? Click{" "}
            <Link className="underline" to={"/auth/register"}>
              here
            </Link>{" "}
            to register.
          </p>
        </div>
      </div>
    </div>
  );
}
