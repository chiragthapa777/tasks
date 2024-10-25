import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner/Spinner";

type Props = InputHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  type?: "submit";
};

export default function Button({
  children,
  className,
  loading,
  disabled,
  ...props
}: Props) {
  const disabledCases = loading || disabled;
  return (
    <button
      className={twMerge(
        "uppercase w-full p-2 border bg-slate-900 text-white text-bold hover:bg-slate-800 flex justify-center items-center gap-3 rounded-md px-4 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
      disabled={disabledCases}
    >
      {loading ? <Spinner /> : ""}
      {children}
    </button>
  );
}
