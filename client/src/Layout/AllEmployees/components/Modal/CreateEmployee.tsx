import "animate.css";
import { FC, useEffect } from 'react'
import { Box, Button, Divider, Modal, Step, StepLabel, Stepper, Tooltip, Typography } from "@mui/material";
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
import SocialBenefit from '../StepView/SocialBenefit';
import Withdrawal from '../TabPanel/WithdrawalEdit';
import Deductions from '../TabPanel/DeductionsEdit';


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
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.employeesSlice);
  const { steps, setSteps, activeStep, isStepSkipped, isStepOptional, handleBack, handleNext, handleReset,
  handleSkip } = useStepper();

  useEffect(() => {
    setSteps(['GENERAL','CONTRATACIÓN','DATOS PERSONALES','PERFIL SOCIODEMOGRAFICO',
    'IDENTIFICACIÓN','CONTRATACIÓN','SEGURIDAD Y SALUD EN EL TRABAJO','BENEFICIARIOS',
    'AFILIACIÓN','PRESTACIÓN SOCIAL','RETIRO','DEDUCCIONES'])
  },[])

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between items-center">
          <h3 className="p-2.5 text-3xl font-bold mb-3">
            Crear Empleado
            {user.users_name && ` - ${user.users_name.toUpperCase()} ${user.users_lastname.toUpperCase()}`}
            {user.users_identification && ` : ${user.users_identification}`}
          </h3>
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

          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Haz finalizado la creacion del empleado, Ahora puedes verlo en la tabla de todos los empleados.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              {/* list steeps */}
              {activeStep == 0 &&(<General handleNext={handleNext}/>)}
              {activeStep == 1 &&(<Contratación handleNext={handleNext}/>)}
              {activeStep == 2 &&(<PersonalInformation handleNext={handleNext}/>)}
              {activeStep == 3 &&(<SociodemographicProfile handleNext={handleNext}/>)}
              {activeStep == 4 &&(<Identification handleNext={handleNext}/>)}
              {/* {activeStep == 5 &&(<Hiring/>)} */}
              {/* {activeStep == 6 &&(<HealthSafetyWork/>)} */}
              {/* {activeStep == 7 &&(<Beneficiary/>)} */}
              {/* {activeStep == 8 &&(<Membership/>)} */}
              {/* {activeStep == 9 &&(<SocialBenefit/>)} */}
              {/* {activeStep == 10 &&(<Withdrawal/>)} */}
              {/* {activeStep == 11 &&(<Deductions/>)} */}

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
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateEmployee
