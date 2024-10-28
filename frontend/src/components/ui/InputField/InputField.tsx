import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, className, ...props }: Props, ref) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={props.name}
          className="text-xs font-semibold capitalize mb-1"
        >
          {label}
        </label>
        <input
          aria-labelledby={props.name}
          aria-label={props.name}
          className={twMerge(
            `border p-2 rounded-md shadow-sm text-sm`,
            className,
            errorMessage && "border-red-500 focus:outline-none"
          )}
          {...props}
          id={props.name}
          ref={ref}
        />
        <p className="text-red-500 text-xs"> {errorMessage}</p>
      </div>
    );
  }
);

export default InputField;
