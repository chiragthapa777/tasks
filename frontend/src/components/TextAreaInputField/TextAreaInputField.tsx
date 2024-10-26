import { forwardRef, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaInputField = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, errorMessage, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={props.name}
          className="text-xs font-semibold capitalize mb-1"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          className={twMerge(
            `border p-2 rounded-md shadow-sm text-sm`,
            className,
            errorMessage && "border-red-500 focus:outline-none"
          )}
          {...props}
        />
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      </div>
    );
  }
);

export default TextAreaInputField;
