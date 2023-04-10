import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { session } from "../components/tools/SesionSettings";

const WithAuthentication = () => {
  const navigate = useNavigate();
  const token = session();

  useEffect(() => {
    if (token) {
      navigate("/dashboard/home");
    }
  }, []);

  return <Outlet />;
};

export default WithAuthentication;
