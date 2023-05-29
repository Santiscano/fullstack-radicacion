import { useEffect, useState } from "react";
import axios from "axios";
import useContextProvider from "../../../Context/GeneralValuesContext";
import allRoutes from "../../../services/allRoutes";
import { getHeader, remove } from "../../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { setPreLoad } = useContextProvider();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleCloseModal = () => setOpen(false);

  const handleGetUsersNoAdminProv = async () => {
    axios.get(allRoutes.api.users.getNoAdminProv, getHeader())
      .then((res) => {
        console.log('usersNoAdminProv: ', res.data.data);
        setRows(res.data.data)
      })
      .catch ((err) => {
        // @ts-ignore
        console.log("error ejecutado",err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message;
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })
      .finally(() => setPreLoad(false))
  };

  useEffect(() => {
    handleGetUsersNoAdminProv();
  },[]);

  return {
    rows,
    open,
    handleOpen,
    handleCloseModal,
  };
};

