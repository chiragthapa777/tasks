import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import globalRouter from "../../config/globalRouter";
import { useAuth } from "../../providers/AuthProvider";

type Props = {};

export default function AuthenticatedRoute({}: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  globalRouter.navigate = navigate;

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth/login");
    }
  }, [user, navigate, loading]);

  return <Outlet />;
}
