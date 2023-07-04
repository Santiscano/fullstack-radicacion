import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { Box, Button, Divider, Modal, Step, StepLabel, Stepper, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useContextProvider from '../../../../Context/GeneralValuesContext';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import useStepper from '../../../../hooks/useStepper';
import General from '../StepView/General';
import Contratación from '../StepView/Contratación';
import PersonalInformation from '../StepView/PersonalInformation';
import SociodemographicProfile from '../StepView/SociodemographicProfile';
import IdentificationEdit from '../TabPanel/IdentificationEdit';
import HiringEdit from '../TabPanel/HiringEdit';
import HealthSafetyWorkEdit from '../TabPanel/HealthSafetyWorkEdit';
import BeneficiaryEdit from '../TabPanel/BeneficiaryEdit';
import MembershipEdit from '../TabPanel/MembershipEdit';
import SocialBenefitEdit from '../TabPanel/SocialBenefitEdit';
import WithdrawalEdit from '../TabPanel/WithdrawalEdit';
import DeductionsEdit from '../TabPanel/DeductionsEdit';
import { TabPanel, a11yProps } from '../../../../components/tools/MultiViewPanel';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "93vw",
  height: "93vh",
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
  const listContracts = [{id:1, contract: "tercero"}, {id:2, contract: "tiempo indefinido"}]

  // view options
  const [showValue, setShowValue] = useState(0);
  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setShowValue(newValue);
  };
  return (
    <>
      <Modal
        open={openModalAuth}
        onClose={handleOpenModalAuth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <div className='flex flex-row items-center'>
              <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Empleado</h3>
              {listContracts.map(contract => (
                <>
                  <Tooltip
                    key={contract.id}
                    title={contract.contract}
                    placement='top'
                    sx={{borderRadius: "50px", width:"10px", height:"40px", alignItems:"center"}}
                  >
                    <Button>{contract.id}</Button>
                  </Tooltip>
                  <Divider orientation="vertical" flexItem sx={{height:"60px"}}/>
                </>
              ))}
            </div>
            <CloseOutlinedIcon
              onClick={handleOpenModalAuth}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          </div>
          <Divider />

          {/* tabs vertical */}
          <Box sx={{ width: "100%", flexDirection:"row" }}>
            <Box sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              height: "auto"
            }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={showValue}
                onChange={handleChange}
                aria-label="Area TI"
                sx={{ borderRight:1, borderColor:'divider', width:"200px"}}
              >
                <Tab label="GENERAL" {...a11yProps(0)}/>
                <Tab label="CONTRATACIÓN" {...a11yProps(1)}/>
                <Tab label="DATOS PERSONALES" {...a11yProps(2)}/>
                <Tab label="PERFIL SOCIODEMOGRAFICO" {...a11yProps(2)}/>
                <Tab label="IDENTIFICACIÓN" {...a11yProps(2)}/>
                <Tab label="CONTRATACIÓN" {...a11yProps(2)}/>
                <Tab label="SEGURIDAD Y SALUD EN EL TRABAJO" {...a11yProps(2)}/>
                <Tab label="BENEFICIARIOS" {...a11yProps(2)}/>
                <Tab label="AFILIACIÓN" {...a11yProps(2)}/>
                <Tab label="PRESTACIÓN SOCIAL" {...a11yProps(2)}/>
                <Tab label="RETIRO" {...a11yProps(2)}/>
                <Tab label="DEDUCCIONES" {...a11yProps(2)}/>
              </Tabs>

              <TabPanel value={showValue} index={0}>
                <General/>
              </TabPanel>
              <TabPanel value={showValue} index={1}>
                <Contratación/>
              </TabPanel>
              <TabPanel value={showValue} index={2}>
                <PersonalInformation/>
              </TabPanel>
              <TabPanel value={showValue} index={3}>
                <SociodemographicProfile/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <IdentificationEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <HiringEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <HealthSafetyWorkEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <BeneficiaryEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <MembershipEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <SocialBenefitEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <WithdrawalEdit/>
              </TabPanel>
              <TabPanel value={showValue} index={4}>
                <DeductionsEdit/>
              </TabPanel>
            </Box>

          </Box>

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
    </>
  )
}

export default EditEmployee
