import { Box, Divider, Modal, Step, StepLabel, Stepper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "animate.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useStepper from "../../../../hooks/useStepper";


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

interface Props {
  open: boolean;
  close:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

const CreateEmployee:FC<Props> = ({ open, close }) => {
  const { steps, setSteps, activeStep, isStepSkipped, handleBack, handleNext, handleReset,
  handleSkip } = useStepper();
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="animate__animated animate__fadeIn"
    >
      <Box sx={style}>
        <div className="flex justify-between items-center">
          <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Empleado</h3>
          {/* @ts-ignore */}
          <button className="cursor-pointer text-sm" onClick={close}>
              <CloseOutlinedIcon />
            </button>
        </div>
        <Divider />

        {/* Steep panel */}
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            sx={{flexWrap:"wrap", marginBottom:"5px"}}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps} >
                  <StepLabel {...labelProps} sx={{padding:"5px"}}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateEmployee
