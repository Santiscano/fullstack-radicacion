import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { GeneralValuesContext } from "./../../../Context/GeneralValuesContext";
import useContextProvider from "./../../../Context/GeneralValuesContext";

function LoadingMUI() {
  const { preLoad } = useContextProvider();
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          height: "100vh",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        // @ts-ignore
        open={preLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default LoadingMUI;
