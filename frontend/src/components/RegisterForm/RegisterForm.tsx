import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../providers/AuthProvider";
import { registerSchema } from "../../schemas/register.schema";
import { register as registerApi } from "../../services/user.service";
import Alert from "../ui/Alert/Alert";
import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";

type Props = {};

export default function RegisterForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = form;
  const { user, setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = getValues();
      const response = await registerApi(body);
      setAuthUser(response.user, response.accessToken);
    } catch (error) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <Alert
        message={error}
        onClose={() => {
          setError("");
        }}
      />
      <InputField
        label="Full Name"
        {...register("name")}
        errorMessage={errors.name?.message}
      />
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
      <InputField
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        className="text-white"
        loading={loading}
        disabled={!isValid}
      >
        Register
      </Button>
    </form>
  );
}
