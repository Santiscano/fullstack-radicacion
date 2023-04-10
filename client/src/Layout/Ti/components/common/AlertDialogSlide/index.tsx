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
      <Button variant="outlined" onClick={handleClickOpenDialogDelete}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialogDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Buscas una razon para cambiar de trabajo da click al boton?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Al carajo todo, aqui murio este archivo y mi vida laboral
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>pensarlo de nuevo</Button>
          <Button onClick={handleDeleteFile}>
            Estoy seguro y quiero que me despidan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide;
