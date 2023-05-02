import Button from "@mui/material/Button";
import useContextProvider from "../../../../../Context/GeneralValuesContext";
import ModalInfoFile from "../../ModalForm";

function ButtonModalEdit(cellValues: any) {
  const { openModalAuth, handleOpenModalAuth, setDataUser } =
    useContextProvider();

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
        <ModalInfoFile
          key={cellValues.id}
          open={openModalAuth}
          close={handleOpenModalAuth}
        />
      )}
    </>
  );
}

export default ButtonModalEdit;
