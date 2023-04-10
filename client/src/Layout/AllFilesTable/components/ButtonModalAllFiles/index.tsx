import { useContext } from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import ModalInfo from "../ModalInfo";
import { GeneralValuesContext } from "../../../../Context/GeneralValuesContext";

function ButtonModalEdit(cellValues: any) {
  const { openModalAuth, handleOpenModalAuth, setDataUser } =
    useContext(GeneralValuesContext);

  const handleClick = () => {
    console.log("result en onclick: ", cellValues);
    setDataUser(cellValues);

    handleOpenModalAuth();
  };

  return (
    <>
      <Button
        component="button"
        variant="contained"
        size="small"
        style={{ marginLeft: 1 }}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === " ") {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
        onClick={(event) => {
          handleClick();
        }}
      >
        Abrir
      </Button>
      {openModalAuth && (
        <ModalInfo
          key={cellValues.id}
          open={openModalAuth}
          close={handleOpenModalAuth}
        />
      )}
    </>
  );
}

export default ButtonModalEdit;
