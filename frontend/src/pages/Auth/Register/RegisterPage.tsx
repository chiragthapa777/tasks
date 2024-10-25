import { Link } from "react-router-dom";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";

type Props = {};

export default function RegisterPage({}: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="border p-4 min-w-80 rounded-md shadow-md bg-white">
        <div className="my-3">
          <h1 className="text-xl font-bold mb-1">Register</h1>
          <p className="text-gray-500 text-sm">
            Enter your email below to register to Task App
          </p>
        </div>
        <RegisterForm />
        <div className=" text-center my-3">
          <p className="text-sm text-gray-500">
            Already have a account? Click{" "}
            <Link className="underline" to={"/auth/login"}>
              here
            </Link>{" "}
            to login.
          </p>
        </div>
      </div>
    </div>
  );
}
