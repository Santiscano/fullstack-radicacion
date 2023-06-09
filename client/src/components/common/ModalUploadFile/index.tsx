import { FC, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "animate.css";

import {
  formattedAmount,
  capitalizeFirstLatterUppercase,
} from "../../../Utilities/formatted.utility";
import LoadingMUI from "./../LoadingMUI/index";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "85vh",
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
  companyName: string;
  lastname: string;
  docIdentity: string;
  price: string;
  accountType: string;
  accountNumber: string | number;
  invoiceType: string;
  redirectTo: number | undefined;
  optionsRedirectTo: any;
  cedi: string;
  settledNumber: string;
  email: string;
  cediType: any;
  children: ReactNode;
}

const UploadFileModal: FC<Props> = ({
  open,
  close,
  companyName,
  lastname,
  docIdentity,
  price,
  accountType,
  accountNumber,
  invoiceType,
  redirectTo,
  optionsRedirectTo,
  cedi,
  settledNumber,
  email,
  cediType,
  children,
}) => {
  const [nameAuditorSelected, setNameAuditorSelected] = useState("");
  // const [openSuccess, setOpenSuccess] = useState(false);

  const filterAuditorSelected = () => {
    if(invoiceType == 'OPERATIVO'){
      setNameAuditorSelected('Contabilidad')
    } else {
      const allAuditors = optionsRedirectTo;
      const auditorSelected = allAuditors.filter(
        (user: { idusers: number }) => user.idusers === redirectTo
      );
      console.log('auditor selected', auditorSelected);
        if(auditorSelected.length > 0 ){
          const nameSelected = `${auditorSelected[0].users_name} ${auditorSelected[0].users_lastname}`;
          setNameAuditorSelected(nameSelected);
        }
      console.log("company name:", companyName);
    }
  };

  useEffect(() => {
    if (open) {
      filterAuditorSelected();
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <Box sx={style}>
          <LoadingMUI />
          <h1 className="border-neutral-300 border-2 rounded p-2.5 text-3xl font-bold mb-3 ">
            Informacion Cliente
          </h1>
          <div className="border-neutral-300 border-2 rounded p-2.5 ">
            <section>
              <div className="flex justify-between flex-wrap">
                <div className="text-2xl font-bold mr-8">
                  <span>{capitalizeFirstLatterUppercase(companyName)} </span>
                  <span>{capitalizeFirstLatterUppercase(lastname)}</span>
                </div>
                <span className="text-blue-700 text-lg">
                  (ID: {docIdentity})
                </span>
                {price && (
                  <p className="mr-8 font-bold text-lg">
                    {formattedAmount(price)}
                  </p>
                )}
              </div>

              <div className="flex mt-4">
                <p className="font-bold inline-block mr-4 w-1/2">
                  Tipo De Cuenta:
                  {accountType && (
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(accountType)}`}
                    </span>
                  )}
                </p>
                <p className="font-bold inline-block mr-4">
                  Numero de Cuenta:
                  {accountNumber && (
                    <span className="text-slate-600 font-normal">
                      {` ${accountNumber}`}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex">
                <p className="font-bold inline-block mr-4 w-1/2">
                  Para:
                  {nameAuditorSelected && (
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(
                        nameAuditorSelected
                      )}`}
                    </span>
                  )}
                </p>
                <p className="font-bold inline-block mr-4">
                  correo:
                  {email && (
                    <span className="text-slate-600 font-normal">
                      {` ${email.toLowerCase()}`}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex">
                {settledNumber && (
                  <p className="font-bold inline-block mr-4 w-1/2">
                    Radicado:
                    <span className="text-slate-600 font-normal">
                      {` ${settledNumber}`}
                    </span>
                  </p>
                )}
                {cedi && (
                  <p className="font-bold inline-block">
                    Cedi:
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(cedi)}`}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex">
                {invoiceType && (
                  <p className="font-bold inline-block mr-4">
                    Area:
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(invoiceType)}`}
                    </span>
                  </p>
                )}
              </div>
            </section>
          </div>
          {children}
          <ChildModalPdf
            cediType={cediType}
            settledNumber={settledNumber}
            accountType={accountType}
          />
        </Box>
      </Modal>
    </>
  );
};

export default UploadFileModal;

const stylePDF = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "75vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export function ChildModalPdf(
  cediType: any,
  settledNumber: any,
  accountType: any,
  children: any
) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...stylePDF }}>
          <div>
            {/* {cediType && <h3>{cediType}</h3>} */}
            {/* {settledNumber && <h3>{settledNumber}</h3>} */}
            {/* {accountType && <h3>{accountType}</h3>} */}
            <h3>si solo sale aqui esta vacio</h3>
            {/* <PDFViewer style={{ width: "100%", height: "90%" }}>
            <PDF />
          </PDFViewer> */}
          </div>
        </Box>
      </Modal>
    </>
  );
}
