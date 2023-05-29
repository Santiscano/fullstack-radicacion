import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Divider, Modal } from "@mui/material";
import "animate.css";
import { FC } from "react";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { formateData } from "../../../../Utilities/formatted.utility";
import Button from "../../../../components/common/Button";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import { useModalUserView } from "../../../../redux/Redux-actions/useModalUserView";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import useSubmit from "../../Hooks/useSubmit";
import InputEditCedi from "../common/InputEditCedi";
import InputEditDocumentType from "../common/InputEditDocumentType";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const EditUserForm: FC = () => {
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { handleSubmitUpdateUser, handleSubmitInactiveUser } = useSubmit();
  const {} = useModalUserView()
  return (
    <>
      <Modal
        open={openModalAuth}
        onClose={handleOpenModalAuth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Proveedor</h3>
            <CloseOutlinedIcon
              onClick={handleOpenModalAuth}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          </div>
          <Divider />
          <form onSubmit={(e) => handleSubmitUpdateUser(e)}>

          </form>
        </Box>
      </Modal>
    </>
  )
}

export default EditUserForm
