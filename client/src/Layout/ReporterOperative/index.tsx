import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Grid, Stack, Tab, Tabs } from '@mui/material';
import { TabPanel, a11yProps } from '../../components/tools/MultiViewPanel';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import Datepicker from "react-tailwindcss-datepicker";
import axios from 'axios';
import { getHeader } from '../../components/tools/SesionSettings';
import useCatch from '../../hooks/useCatch';
import allRoutes from '../../services/allRoutes';
import { cleanFileName } from '../../Utilities/formatted.utility';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

const ReporterOperative = () => {
  const { handleCatch } = useCatch();

  // -------------admin--------------//
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [adminShowValue, setAdminShowValue] = useState(0);
  const handleChangeTabs = (e: React.SyntheticEvent, newValue: number) => { setAdminShowValue(newValue) };
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -7),
      key: 'admin'
    }
  ]);
  const handleSelectAdmin = (ranges:any) => {
    const start = ranges.admin.startDate.toISOString();
    const end = ranges.admin.endDate.toISOString();
    setStart(start);
    setEnd(end);
    setSelectionRange([ranges.admin]);
  };
  const handleSubmitFinishAdmin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDate = cleanFileName(start);
    const endDate = cleanFileName(end);
    axios.post(allRoutes.api.reporter.finishedReport,{
      type: "ADMINISTRATIVO",
      startDate,
      endDate,
    },getHeader())
      .then((res)=> {
        window.location.href = res?.data.data
      })
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  // ----------------operative-------------------//
  // const [startOp, setStartOp] = useState('');
  // const [endOp, setEndOp] = useState('');
  const [operativeShowValue, setOperativeShowValue] = useState(0);
  const handleChangeOperative = (e: React.SyntheticEvent, newValue: number) => { setOperativeShowValue(newValue) };
  // const [selectionRangeOp, setSelectionRangeOp] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), -7),
  //     key: 'operative'
  //   }
  // ]);
  // const handleSelectOperative = (ranges:any) => {
  //   const start = ranges.operative.startDate.toISOString();
  //   const end = ranges.operative.endDate.toISOString();
  //   setStartOp(start);
  //   setEndOp(end);
  //   setSelectionRangeOp([ranges.operative]);
  // };
  // const handleSubmitFinishOperative = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const startDate = cleanFileName(startOp);
  //   const endDate = cleanFileName(endOp);
  //   axios.post(allRoutes.api.reporter.finishedReport,{
  //     type: "OPERATIVO",
  //     startDate,
  //     endDate,
  //   },getHeader())
  //     .then((res)=> window.location.href = res?.data.data)
  //     .catch((error:Error) => {
  //       console.log('ERROR', error);
  //       handleCatch(error)
  //     });
  // };
  const [operative, setOperative] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), -15),
  });
  const handleOperativeChange = (newValue:DateValueType, e: HTMLInputElement | null | undefined) => {
    console.log(newValue);
  };
  // --------------------pending----------------------//
  const handleSubmitPending = (event: FormEvent<HTMLFormElement>, type: string) => {
    event.preventDefault();
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
              <form onSubmit={(event) => handleSubmitPending(event, 'ADMINISTRATIVO' )}>
                <button className='button button--flex'>DESCARGAR EXCEL</button>
              </form>
            </Box>
          </TabPanel>
          <TabPanel value={adminShowValue} index={1}>
            <Box>
              <DateRange
                onChange={handleSelectAdmin}
                ranges={selectionRange}
                moveRangeOnFirstSelection={false}
                months={2}
                editableDateInputs={true}
                direction="horizontal"
              />
              <form onSubmit={handleSubmitFinishAdmin}>
                <button className='button button--flex'> DESCARGAR EXCEL</button>
              </form>
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
              <form onSubmit={(event) => handleSubmitPending(event, 'OPERATIVO' )}>
                <button className='button button--flex'> DESCARGAR EXCEL</button>
              </form>
            </Box>
          </TabPanel>
          <TabPanel value={operativeShowValue} index={1}>
            <Box>
              {/* <DateRange
                onChange={handleSelectOperative}
                ranges={selectionRangeOp}
                moveRangeOnFirstSelection={false}
                months={2}
                editableDateInputs={true}
                direction="horizontal"
              /> */}
              <Datepicker
                primaryColor={"sky"}
                value={operative}
                onChange={handleOperativeChange}
                popoverDirection="down"
                placeholder='test'
              />
              {/* <form onSubmit={handleSubmitFinishOperative}>
                <button className='button button--flex'> DESCARGAR EXCEL</button>
              </form> */}
            </Box>
          </TabPanel>
        </Box>
      </Grid>

    </Stack>
  )
}

export default ReporterOperative
