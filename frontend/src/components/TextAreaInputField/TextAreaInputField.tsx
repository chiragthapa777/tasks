import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const TextAreaInputField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, className, ...props }: Props) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={props.name}
          className="text-xs font-semibold capitalize mb-1"
        >
          {label}
        </label>
        <textarea
          className={twMerge(
            `border p-2 rounded-md shadow-sm text-sm`,
            className,
            errorMessage && "border-red-500 focus:outline-none"
          )}
          {...props}
        ></textarea>
        <p className="text-red-500 text-xs"> {errorMessage}</p>
      </div>
    );
  }
);

export default TextAreaInputField;
