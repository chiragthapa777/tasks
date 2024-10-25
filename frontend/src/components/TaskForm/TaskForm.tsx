import { useState } from "react";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import TextAreaInputField from "../TextAreaInputField/TextAreaInputField";

type Props = {};

export default function TaskForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const form = useForm<z.infer<typeof loginSchema>>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   mode: "all",
  // });
  // const {
  //   register,
  //   formState: { errors, isValid, isDirty },
  //   getValues,
  // } = form;
  // const { user, setAuthUser } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);

  // const = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const body = getValues();
  //     const response = await login(body);
  //     setAuthUser(response.user, response.accessToken);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : (error as string));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <form action="" className="flex flex-col gap-4">
      <Alert
        message={error}
        onClose={() => {
          setError("");
        }}
      />{" "}
      <InputField label="title" />
      <InputField label="Schedule at" type="datetime-local" />
      <TextAreaInputField label="Description" />
      <Button className="text-white w-full sm:w-36">Add</Button>
    </form>
  );
}
