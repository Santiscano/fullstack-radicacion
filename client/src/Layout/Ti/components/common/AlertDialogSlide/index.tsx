import { ReactElement, Ref, forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import useSubmit from "../../../Hooks/useSubmit";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(inputDeleted: any) {
  const valueDelete = inputDeleted.inputDeleted;
  console.log("inputDeleted: ", valueDelete);
  const [open, setOpen] = useState(false);

  const handleClickOpenDialogDelete = () => {
    setOpen(true);
  };

  const handleCloseDialogDelete = () => {
    setOpen(false);
  };

  const { handleDeleteFile } = useSubmit();

  return (
    <div>
      <Button
        variant="contained"
        // color="#ef4444"
        style={{
          color: "#fff",
          background: "#ef4444",
          marginTop: "12px",
          marginLeft: "18px",
        }}
        onClick={handleClickOpenDialogDelete}
      >
        Eliminar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialogDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ fontWeight: "bold" }}>
          {`Estas seguro de querer Eliminar este archivo? `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            color="error"
            style={{ fontWeight: "bolder" }}
          >
            Ten en cuenta que NO podras recuperar esta informacion despues de
            eliminar el archivo: "{`${valueDelete}`}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialogDelete}
            style={{ marginBottom: "15px", marginRight: "10px" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={(e) =>
              handleDeleteFile(e, valueDelete, handleCloseDialogDelete)
            }
            color="error"
            style={{ marginBottom: "15px", marginRight: "15px" }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide;
