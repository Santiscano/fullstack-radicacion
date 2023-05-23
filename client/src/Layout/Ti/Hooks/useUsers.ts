import { useEffect, useState } from "react";
import axios from "axios";
import useContextProvider from "../../../Context/GeneralValuesContext";
import allRoutes from "../../../services/allRoutes";
import { getHeader } from "../../../components/tools/SesionSettings";

export const useUsers = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { setPreLoad } = useContextProvider();

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
      .catch((err) => console.log(err))
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

