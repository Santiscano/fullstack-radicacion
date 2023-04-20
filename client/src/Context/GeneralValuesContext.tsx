import { createContext, FC, SyntheticEvent, useContext, useState } from "react";
import { GeneralValuesType } from "../interfaces/GeneralValues";
import { showTablePending } from "../services/showTable.routes";
import { AlertColor, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

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
  openSnackbar: false,
  setOpenSnackbar: () => {},
  messageSnackbar: "",
  setMessageSnackbar: () => {},
  severitySnackbar: undefined,
  setSeveritySnackbar: () => {},
  handleCloseSnackbar: () => {},
  TransitionLeft: () => {},
  handleMessageSnackbar: () => {},
});

const GeneralValuesProvider: FC = ({ children }: any) => {
  const [preLoad, setPreLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState("");
  const [user, setUser] = useState({});
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [rows, setRows] = useState([]);
  // snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [severitySnackbar, setSeveritySnackbar] = useState<
    AlertColor | undefined
  >();

  const handleOpenModalAuth = () => setOpenModalAuth(!openModalAuth);
  const handleCloseModalAuth = () => setOpenModalAuth(false);
  const handleUpdateRows = async () => {
    try {
      setPreLoad(true);
      const table = await showTablePending();
      const rowsData = await table?.data.dataInfo;
      setRows(rowsData ? rowsData : []);
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * cierra el snackbar
   * @param event
   * @param reason tecla que activara el evento
   * @returns
   */
  const handleCloseSnackbar = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  /**
   * crea la transicion desde donde aparece
   * @param props define la direccion de la transicion
   * @returns
   */
  function TransitionLeft(props: TransitionProps) {
    // @ts-ignore
    return <Slide {...props} direction="left" />;
  }
  /**
   * abre el snackbar y define el color y la info
   * @param type success | info | warning | error
   * @param message view info
   */
  const handleMessageSnackbar = (type: AlertColor, message: string) => {
    setSeveritySnackbar(type);
    setMessageSnackbar(message);
    setOpenSnackbar(true);
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
        // snackbar
        openSnackbar,
        setOpenSnackbar,
        TransitionLeft,
        handleCloseSnackbar,
        severitySnackbar,
        setSeveritySnackbar,
        messageSnackbar,
        setMessageSnackbar,
        handleMessageSnackbar,
      }}
    >
      {children}
    </GeneralValuesContext.Provider>
  );
};

export default function useContextProvider() {
  return useContext(GeneralValuesContext);
}

export { GeneralValuesProvider };
