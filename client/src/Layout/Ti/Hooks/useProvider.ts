import { useEffect, useState } from "react";
import axios from "axios";
import useContextProvider from "../../../Context/GeneralValuesContext";
import allRoutes from "../../../services/allRoutes";
import { getHeader } from "../../../components/tools/SesionSettings";
import { useModalUserView } from "../../../redux/Redux-actions/useModalUserView";

export const useProvider = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { setPreLoad } = useContextProvider();
  const { removeModalUser } = useModalUserView();

  const handleOpen = () => {
    setOpen(!open);
    removeModalUser();
  };
  const handleCloseModal = () => setOpen(false);

  const handleGetProvider = async () => {
    setPreLoad(true);
    axios.post(allRoutes.api.users.getByRol,{ idroles: 1 }, getHeader())
      .then((res) => {
        console.log('providers: ', res.data.data.data);
        setRows(res.data.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setPreLoad(false))
  };

  useEffect(() => {
    handleGetProvider();
  },[]);

  return {
    rows,
    open,
    handleOpen,
    handleCloseModal,
  };
};
