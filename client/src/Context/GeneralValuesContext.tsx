import { createContext, FC, useContext, useState } from "react";
import { GeneralValuesType } from "../interfaces/GeneralValues";
import { showTablePending } from "../services/showTable.routes";

export const GeneralValuesContext = createContext<GeneralValuesType>({
  preLoad: false,
  setPreLoad: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorLogin: "",
  setErrorLogin: () => {},
  user: {
    idroles: 0,
    idsedes: 0,
    idusers: 0,
    roles: "",
    sedes_city: "",
    sedes_name: "",
    users_email: "",
    users_identification: "",
    users_identification_type: "",
    users_lastname: "",
    users_name: "",
    users_status: "",
  },
  setUser: () => {},
  openModalAuth: false,
  setOpenModalAuth: () => {},
  handleOpenModalAuth: () => {},
  handleCloseModalAuth: () => {},
  dataUser: [],
  setDataUser: () => {},
  rows: [],
  setRows: () => {},
  handleUpdateRows: () => {},
});

const GeneralValuesProvider: FC = ({ children }: any) => {
  const [preLoad, setPreLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState("");
  const [user, setUser] = useState({});
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [rows, setRows] = useState([]);

  const handleOpenModalAuth = () => setOpenModalAuth(!openModalAuth);
  const handleCloseModalAuth = () => setOpenModalAuth(false);
  const handleUpdateRows = async () => {
    try {
      setPreLoad(true);
      const table = await showTablePending();
      const rowsData = await table?.data.dataInfo;
      setRows(rowsData ? rowsData : []);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  return (
    <GeneralValuesContext.Provider
      value={{
        preLoad,
        setPreLoad,
        isLoading,
        setIsLoading,
        errorLogin,
        setErrorLogin,
        // @ts-ignore
        user,
        setUser,
        openModalAuth,
        setOpenModalAuth,
        handleOpenModalAuth,
        handleCloseModalAuth,
        dataUser,
        setDataUser,
        rows,
        setRows,
        handleUpdateRows,
      }}
    >
      {children}
    </GeneralValuesContext.Provider>
  );
};

export default GeneralValuesProvider;
