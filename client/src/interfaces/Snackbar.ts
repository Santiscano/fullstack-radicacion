import { AlertColor } from "@mui/material";

export interface Snackbar {
  openSnackbar:boolean;
  setOpenSnackbar:React.Dispatch<React.SetStateAction<boolean>>;
  messageSnackbar:string,
  setMessageSnackbar:React.Dispatch<React.SetStateAction<string>>;
  severitySnackbar:AlertColor | undefined,
  setSeveritySnackbar:React.Dispatch<React.SetStateAction<AlertColor | undefined>>;
  handleCloseSnackbar: any,
  TransitionLeft: any,
  handleMessageSnackbar: any,
}
