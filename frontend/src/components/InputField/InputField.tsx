import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, className, ...props }: Props, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={props.name} className="text-sm capitalize">
          {label}
        </label>
        <input
          className={twMerge(
            `border p-1 ${errorMessage && "border-red-500 focus:outline-none"}`,
            className
          )}
          {...props}
          ref={ref}
        />
        <p className="text-red-500 text-sm"> {errorMessage}</p>
      </div>
    );
  }
);

export default InputField;
