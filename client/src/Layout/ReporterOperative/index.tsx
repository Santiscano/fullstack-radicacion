import { FormEvent, useState } from 'react';
import { Box, Divider, Grid, Stack, Tab, Tabs } from '@mui/material';
import { TabPanel, a11yProps } from '../../components/tools/MultiViewPanel';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import axios from 'axios';
import { getHeader } from '../../components/tools/SesionSettings';
import useCatch from '../../hooks/useCatch';

const ReporterOperative = () => {
  const { handleCatch } = useCatch();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [adminShowValue, setAdminShowValue] = useState(0);
  const handleChangeAdmin = (e: React.SyntheticEvent, newValue: number) => { setAdminShowValue(newValue) };

  const [operativeShowValue, setOperativeShowValue] = useState(0);
  const handleChangeOperative = (e: React.SyntheticEvent, newValue: number) => { setOperativeShowValue(newValue) };

  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -7),
      key: 'admin'
    }
  ])

  const handleSelectAdmin = (ranges:any) => {
    const start = ranges.admin.startDate.toISOString();
    const end = ranges.admin.endDate.toISOString();
    setStart(start);
    setEnd(end);
    setSelectionRange([ranges.admin]);
  }

  const handleSubmitPending = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('',{},getHeader())
      .then(()=> {})
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  const handleSubmitFinish = (event: FormEvent<HTMLFormElement>, type:string) => {
    event.preventDefault();
    axios.post('',{},getHeader())
      .then(()=> {})
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  const handleSubmitOperativePending = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('',{},getHeader())
      .then(()=> {})
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
      });
  };
  const handleSubmitOperativeFinish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('',{},getHeader())
      .then(()=> {})
      .catch((error:Error) => {
        console.log('ERROR', error);
        handleCatch(error)
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
              onChange={handleChangeAdmin}
              aria-label="Reportero"
              variant="scrollable"
            >
              <Tab label="PENDIENTES" {...a11yProps(0)}/>
              <Tab label="FINALIZADOS" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={adminShowValue} index={0}>
            <Box>

            </Box>
          </TabPanel>
          <TabPanel value={adminShowValue} index={1}>
            <Box>
              {/* date range */}
              <DateRange
                onChange={handleSelectAdmin}
                ranges={selectionRange}
                moveRangeOnFirstSelection={false}
                months={2}
                editableDateInputs={true}
                direction="horizontal"
              />
              <form onSubmit={(event) => handleSubmitFinish(event, 'hola' )}>
                <button className='button button--flex'> DESCARGAR EXCEL</button>
              </form>
            </Box>
          </TabPanel>
        </Box>
      </Grid>

      <Grid item xs={6} className='p-12 bg-white rounded-3xl'>
        <h2 className='text-2xl font-bold mb-6 text-center'>OPERATIVO</h2>
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

            </Box>
          </TabPanel>
          <TabPanel value={operativeShowValue} index={1}>
            <Box>

            </Box>
          </TabPanel>
        </Box>
      </Grid>

    </Stack>
  )
}

export default ReporterOperative
