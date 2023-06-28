import { FC, useEffect } from 'react'
import { Box, Button, Divider, Modal, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useContextProvider from '../../../../Context/GeneralValuesContext';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import useStepper from '../../../../hooks/useStepper';
import General from '../StepView/General';
import Contratación from '../StepView/Contratación';
import PersonalInformation from '../StepView/PersonalInformation';
import SociodemographicProfile from '../StepView/SociodemographicProfile';
import Identification from '../StepView/Identification';
import Hiring from '../StepView/Hiring';
import HealthSafetyWork from '../StepView/HealthSafetyWork';
import Beneficiary from '../StepView/Beneficiary';
import Membership from '../StepView/Membership';

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

const EditEmployee: FC = () => {
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.employeesSlice);
  const { steps, setSteps, activeStep, isStepSkipped, isStepOptional, handleBack,
    handleNext, handleReset, handleSkip } = useStepper();


  useEffect(() => {
    setSteps(['GENERAL','CONTRATACIÓN','DATOS PERSONALES','PERFIL SOCIODEMOGRAFICO',
    'IDENTIFICACIÓN','CONTRATACIÓN','SEGURIDAD Y SALUD EN EL TRABAJO','BENEFICIARIOS',
    'AFILIACIÓN','PRESTACIÓN SOCIAL','RETIRO','DEDUCCIONES'])
  },[])

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
            <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Empleado</h3>
            <CloseOutlinedIcon
              onClick={handleOpenModalAuth}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
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

            {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
            ) : (
            <>
              {/* butons next - prev */}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </Box>
              {/* list steeps */}
              {activeStep == 0 &&(<General/>)}
              {activeStep == 1 &&(<Contratación/>)}
              {activeStep == 2 &&(<PersonalInformation/>)}
              {activeStep == 3 &&(<SociodemographicProfile/>)}
              {activeStep == 4 &&(<Identification/>)}
              {activeStep == 5 &&(<Hiring/>)}
              {activeStep == 6 &&(<HealthSafetyWork/>)}
              {activeStep == 7 &&(<Beneficiary/>)}
              {activeStep == 8 &&(<Membership/>)}
              {/* {activeStep == 9 &&(</>)} */}
              {/* {activeStep == 10 &&(</>)} */}

              {/* butons next - prev */}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Anterior
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </Box>
            </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default EditEmployee
