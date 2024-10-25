import { Outlet } from "react-router-dom";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}
