import Drawer from "@mui/material/Drawer";
import { useState } from "react";
// components mui
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
// icons mui
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import { Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link, useNavigate } from "react-router-dom";
import { WithRoleAllowedRoutes } from "../../../../Middlewares/WithRoleAllowed";
import working from "../../../../assets/icons/data-analysis-case-study.png";
import enviexpress from "../../../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import {
  optionsViewsAllFiles,
  optionsViewsHumanManagement,
  optionsViewsFiles,
  optionsViewsNotAuditors,
  optionsViewsSettled,
  optionsViewsTI,
} from "../../../../components/tools/OptionsValuesSelects";
import { session } from "../../../../components/tools/SesionSettings";
import rutero from "../../../../routes/RutesSidebar";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  backgroundColor: "#e4e4e7",
}));

function index(props: any) {
  const theme = useTheme();
  const navigate = useNavigate();
  const color = "#293184";

  const [openSettled, setOpenSettled] = useState(false);
  const handleOpenFiles = () => setOpenSettled(!openSettled);

  const [openFiles, setOpenFiles] = useState(false);
  const handleOpenPending = () => setOpenFiles(!openFiles);

  const [openReporter, setOpenReporter] = useState(false);
  const handleOpenReporter = () => setOpenReporter(!openReporter);

  const [openDG, setOpenDG] = useState(false);
  const handleOpenDG = () => setOpenDG(!openDG);

  const [openDev, setOpenDev] = useState(false);
  const handleOpenDev = () => setOpenDev(!openDev);

  const handleRouteValidate = (nav: any) => {
    // console.log("session", session());
    !!session() ? navigate(`${nav.url}`) : navigate("/login");
  };

  return (
    <Drawer
      sx={{
        backgroundColor: "#e4e4e7",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#e4e4e7",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <Link to="/dashboard/home">
          <img src={enviexpress} width={160} className="inline " />
        </Link>
        <IconButton onClick={props.handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>

      <Divider />

      {/* radicados */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsSettled}>
        <List>
          <ListItemButton onClick={handleOpenFiles}>
            <ListItemIcon>
              <AssignmentOutlinedIcon sx={{ color: color }} />
            </ListItemIcon>
            <ListItemText primary="Radicación" />
            {openSettled ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSettled} timeout="auto" unmountOnExit>
            <List>
              {rutero.online.settling.map((list, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleRouteValidate(list)} sx={{ml: 4}}>
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        {/* <Divider /> */}
      </WithRoleAllowedRoutes>

      {/* mis archivos */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsFiles}>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleOpenPending}>
            <ListItemIcon>
              <FolderOutlinedIcon sx={{ color: color }} />
            </ListItemIcon>
            <ListItemText primary="Mis Archivos" />
            {openFiles ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFiles} timeout="auto" unmountOnExit>
            {rutero.online.files.map((list, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`${list.url}`)}
                >
                  <ListItemIcon>{list.icon}</ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>
      </WithRoleAllowedRoutes>

      {/* todos los archivos */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsNotAuditors}>
        <List>
          {rutero.online.allFiles.map((list, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(`${list.url}`)}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </WithRoleAllowedRoutes>

      {/* Trazabilidad archivos */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsAllFiles}>
        <List>
          {rutero.online.traceability.map((list, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(`${list.url}`)}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </WithRoleAllowedRoutes>

      {/* Reporteros */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsNotAuditors}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/dashboard/reporter')}>
              <ListItemIcon><FindInPageOutlinedIcon sx={{ color: color }} /></ListItemIcon>
              <ListItemText primary='Reportero'/>
            </ListItemButton>
          </ListItem>
        </List>
      </WithRoleAllowedRoutes>

      {/* Administracion */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsTI}>
        <List>
          {rutero.online.ti.map((list, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(`${list.url}`)}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </WithRoleAllowedRoutes>

      {/* Centros de costos */}
      <List>
        {rutero.online.CenterCost.map((list, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(`${list.url}`)}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* Gestion Humana */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsHumanManagement}>
        <List>
          <ListItemButton onClick={handleOpenDG}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon sx={{ color: color }} />
            </ListItemIcon>
            <ListItemText primary="Gestion Humana" />
            {openDG ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDG} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {rutero.online.humanManagement.map((list, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate(`${list.url}`)}
                  >
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </WithRoleAllowedRoutes>

      {/* En desarrollo */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsHumanManagement}>
        <List>
          <ListItemButton onClick={handleOpenDev}>
            <ListItemIcon>
              <LogoDevOutlinedIcon sx={{ color: color }}/>
            </ListItemIcon>
            <ListItemText primary="En desarrollo" />
            {openDev ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDev} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {rutero.online.dev.map((list, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate(`${list.url}`)}
                  >
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </WithRoleAllowedRoutes>

      <img
        src={working}
        alt="image working"
        style={{ backgroundColor: "#e4e4e7", width: 230 }}
      />
    </Drawer>
  );
}

export default index;
