import { FormEvent, useState } from 'react'
import { Box, Grid, Stack, Tab, Tabs } from '@mui/material';
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { TabPanel, a11yProps } from '../../components/tools/MultiViewPanel';
import axios from 'axios';
import allRoutes from '../../services/allRoutes';
import { getHeader } from '../../components/tools/SesionSettings';
import useCatch from '../../hooks/useCatch';

const Reporter = () => {
  const { handleCatch } = useCatch();
  // tabs
  const [adminShowValue, setAdminShowValue] = useState(0);
  const handleChangeTabs = (e: React.SyntheticEvent, newValue: number) => { setAdminShowValue(newValue) };
  const [operativeShowValue, setOperativeShowValue] = useState(0);
  const handleChangeOperative = (e: React.SyntheticEvent, newValue: number) => { setOperativeShowValue(newValue) };
  // --------------------administrativo----------------------//
  const [admin, setAdmin] = useState({
    startDate: null,
    endDate: null
  });
  const handleAdminChange = (newValue:DateValueType, e:HTMLInputElement | null | undefined) => {
    console.log(newValue);
    // @ts-ignore
    setAdmin(newValue);
  };
  const handleSubmitAdmin = () => {
    axios.post(allRoutes.api.reporter.finishedReport,{
      type: "ADMINISTRATIVO",
      startDate:admin.startDate,
      endDate:admin.endDate,
    },getHeader())
      .then((res)=> window.location.href = res?.data.data)
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  // --------------------operativo----------------------//
  const [operative, setOperative] = useState({
    startDate: null,
    endDate: null,
  });
  const handleOperativeChange = (newValue:DateValueType, e: HTMLInputElement | null | undefined) => {
    console.log(newValue);
    // @ts-ignore
    setOperative(newValue);
  };
  const handleSubmitOperative = () => {
    axios.post(allRoutes.api.reporter.finishedReport,{
      type: "OPERATIVO",
      startDate: operative.startDate,
      endDate: operative.endDate,
    },getHeader())
      .then((res)=> window.location.href = res?.data.data)
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  // --------------------pending----------------------//
  const handleSubmitPending = (type: string) => {
    axios.post(allRoutes.api.reporter.pendingReport,{ type },getHeader())
      .then((res)=> {
        window.location.href = res?.data.data
      })
      .catch((error) => {
        console.log('ERROR', error);
        handleCatch(error);
      });
  };


  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-evenly"
      spacing={2}
      sx={{height:"auto"}}
    >
      <Grid item xs={6} className='p-12 bg-white max-w-xl rounded-3xl'>
        <h2 className='text-2xl font-bold text-center'>ADMINISTRATIVO</h2>
        <Box sx={{ with: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={adminShowValue}
              onChange={handleChangeTabs}
              aria-label="Reportero"
              variant="scrollable"
            >
              <Tab label="PENDIENTES" {...a11yProps(0)}/>
              <Tab label="FINALIZADOS" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={adminShowValue} index={0}>
            <Box>
              <button className='button button--flex' onClick={() => handleSubmitPending('ADMINISTRATIVO')}> DESCARGAR EXCEL </button>
            </Box>
          </TabPanel>
          <TabPanel value={adminShowValue} index={1}>
            <Box>
              <Datepicker
                primaryColor={"sky"}
                value={admin}
                onChange={handleAdminChange}
                maxDate={new Date()}

              />
              <button className='button button--flex' onClick={handleSubmitAdmin}>
                DESCARGAR EXCEL
              </button>
            </Box>
          </TabPanel>
        </Box>
      </Grid>

      <Grid item xs={6} className='p-12 bg-white rounded-3xl'>
        <h2 className='text-2xl font-bold text-center'>OPERATIVO</h2>
        <Box sx={{ with: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={operativeShowValue}
              onChange={handleChangeOperative}
              aria-label="Reportero"
              variant="scrollable"
            >
              <Tab label="PENDIENTES" {...a11yProps(0)}/>
              <Tab label="FINALIZADOS" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={operativeShowValue} index={0}>
            <Box>
              <button className='button button--flex' onClick={() => handleSubmitPending('OPERATIVO')}> DESCARGAR EXCEL </button>
            </Box>
          </TabPanel>
          <TabPanel value={operativeShowValue} index={1}>
            <Box>
              <Datepicker
                primaryColor={"sky"}
                value={operative}
                onChange={handleOperativeChange}
                maxDate={new Date()}
                popoverDirection="down"
                placeholder={'seleccione rango de fechas'}
              />
              <button className='button button--flex' onClick={handleSubmitOperative}>DESCARGAR EXCEL</button>
            </Box>
          </TabPanel>
        </Box>
      </Grid>
    </Stack>
  )
}

export default Reporter;
