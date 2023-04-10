import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { session } from "../components/tools/SesionSettings";

const NotAuthentication = () => {
  const navigate = useNavigate();
  const token = session();
  // console.log("token: ", token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <Outlet />;
};

export default NotAuthentication;
