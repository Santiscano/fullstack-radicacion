import { useEffect, useState } from "react";
import axios from "axios";
import useContextProvider from "../../../Context/GeneralValuesContext";
import allRoutes from "../../../services/allRoutes";
import { getHeader, remove } from "../../../components/tools/SesionSettings";
import { useModalUserView } from "../../../redux/Redux-actions/useModalUserView";
import { useNavigate } from "react-router-dom";

export const useProvider = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { setPreLoad } = useContextProvider();
  const { removeModalUser } = useModalUserView();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
    removeModalUser();
  };
  const handleCloseModal = () => setOpen(false);

  const handleClearDataProviders = () => {
    setRows([])
    handleGetProvider();
  };
  const handleGetProvider = async () => {
    setPreLoad(true);
    axios.post(allRoutes.api.users.getByRol,{ idroles: 1 }, getHeader())
      .then((res) => {
        console.log('providers: ', res);
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
    handleGetProvider();
  },[]);

  return {
    rows,
    open,
    handleOpen,
    handleCloseModal,
    handleClearDataProviders,
    handleGetProvider,
  };
};
