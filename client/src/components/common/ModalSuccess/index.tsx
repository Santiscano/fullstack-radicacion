import { Box, Modal } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./modalSuccess.css";
import "animate.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "50vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  close:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  setModalSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  identification: string;
  newSettledSameUser?: any;
  resetFullForm?: any;
}

const ModalSuccess: FC<Props> = ({
  open,
  close,
  setModalSuccess,
  type,
  identification,
  newSettledSameUser,
  resetFullForm,
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  // console.log(identification);
  useEffect(() => {
    setShowCheckmark(true);
    setTimeout(() => {
      setShowCheckmark(false);
    }, 10);
  }, []);
  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <div className="main-container">
            <div className="check-container">
              <div className="check-background">
                <svg
                  viewBox="0 0 65 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 25L27.3077 44L58.5 7"
                    stroke="white"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="check-shadow"></div>
            </div>
          </div>
          <h3 className="animate__animated animate__fadeIn">
            {type} {identification} guardado con exito
          </h3>

          {resetFullForm && (
            <button
              className="button button--flex mt-4 relative top-4 animate__animated animate__fadeIn"
              onClick={resetFullForm}
              style={{ background: "#55e08c", display: "inline" }}
            >
              Finalizar
            </button>
          )}

          {newSettledSameUser && (
            <button
              className="button button--flex mt-4 relative top-4 animate__animated animate__fadeIn"
              onClick={newSettledSameUser}
              style={{ display: "inline" }}
            >
              Nuevo radicado - Mismo usuario
            </button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalSuccess;
