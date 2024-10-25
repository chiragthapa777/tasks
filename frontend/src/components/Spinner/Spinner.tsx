import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function Spinner({ className }: Props) {
  return (
    <div
      className={twMerge(
        "border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600",
        className
      )}
    />
  );
}
