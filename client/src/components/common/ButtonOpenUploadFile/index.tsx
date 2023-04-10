import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import BasicModal from "../../../Layout/PendingFilesTable/components/ModalForm";
import UploadFileModal from "../ModalUploadFile";

const ButtonOpenUploadFile = (props: any) => {
  const { hasFocus, value } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);

  // useState
  const [open, setOpen] = React.useState(false);
  // ----------------------------------------
  // Methods
  // ----------------------------------------
  const handleOpen = () => {
    console.log(props);
    setOpen(true);
    console.log("open: ", open);
  };
  const handleClose = () => setOpen(false);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  return (
    <>
      <Button
        component="button"
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 1 }}
        // Remove button from tab sequence when cell does not have focus
        tabIndex={hasFocus ? 0 : -1}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === " ") {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
        onClick={handleOpen}
      >
        Crear requerimiento
      </Button>
      {/* <UploadFileModal open={open} close={handleClose} /> */}
    </>
  );
};

export default ButtonOpenUploadFile;
