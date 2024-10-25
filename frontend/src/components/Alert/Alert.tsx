import { ShieldAlert, X } from "lucide-react";

type Props = {
  message?: string;
  onClose: () => void;
};

export default function Alert({ message, onClose }: Props) {
  if (!message) return <></>;
  return (
    <div className="bg-red-100 p-2 rounded-md relative text-red-500 text-xs flex justify-start gap-1 items-start">
      <button
        onClick={onClose}
        className="absolute -top-1 -right-1 p-0.5 rounded-full bg-white border border-red-100 cursor-pointer hover:bg-red-50"
      >
        <X size={14} />
      </button>
      <ShieldAlert size={18} />
      <div>
        <h2 className="text-md font-semibold">Error</h2>
        <p className="">{message}</p>
      </div>
    </div>
  );
}
