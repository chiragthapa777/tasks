import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import TextAreaInputField from "../TextAreaInputField/TextAreaInputField";

type Props = {};

export default function TaskForm({}: Props) {
  return (
    <form action="" className="flex flex-col gap-4">
      <InputField label="title" />
      <InputField label="Schedule at" type="datetime-local" />
      <TextAreaInputField label="Description" />
      <Button className="text-white w-full sm:w-36">Add</Button>
    </form>
  );
}
