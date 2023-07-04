import Box from "@mui/material/Box";
import { TabPanelProps } from "../../interfaces/TabPanel";
import Typography from "@mui/material/Typography";
import { width } from '@mui/system';

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="w-full"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="section">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
