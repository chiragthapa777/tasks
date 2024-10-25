import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

type Props = {};

export default function LoginForm({}: Props) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const {
    register,
    formState: { errors, isValid },
  } = form;
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  console.log(errors);
  console.log(isValid);
  return (
    <div className="max-w-96 p-2">
      <form onSubmit={handleLogin}>
        <InputField
          label="email"
          placeholder="example@gmail.com"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <InputField
          label="password"
          type="password"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" className="text-white" loading={false}>
          Login
        </Button>
      </form>
    </div>
  );
}
