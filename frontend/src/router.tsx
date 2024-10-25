import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute/AuthenticatedRoute";
import LoginPage from "./pages/Auth/Login/LoginPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import TaskAddPage from "./pages/Task/TaskAdd/TaskAddPage";
import TaskEditPage from "./pages/Task/TaskEdit/TaskEditPage";
import TaskPage from "./pages/Task/TaskPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        element: <AuthenticatedRoute />,
        path: "",
        children: [
          {
            path: "",
            element: <TaskPage />,
          },
          {
            path: ":id/edit",
            element: <TaskEditPage />,
          },
          {
            path: "add",
            element: <TaskAddPage />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
