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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import FolderSpecialOutlinedIcon from "@mui/icons-material/FolderSpecialOutlined";
import { Collapse } from "@mui/material";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { Link, useNavigate } from "react-router-dom";
import { WithRoleAllowedRoutes } from "../../../../Middlewares/WithRoleAllowed";
import working from "../../../../assets/icons/data-analysis-case-study.png";
import enviexpress from "../../../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import {
  optionsViewsAllFiles,
  optionsViewsDigitization,
  optionsViewsFiles,
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

// ROLES
const rolTI = true;

function index(props: any) {
  const theme = useTheme();
  const navigate = useNavigate();
  const color = "#293184";

  const [openSettled, setOpenSettled] = useState(false);
  const handleOpenFiles = () => setOpenSettled(!openSettled);

  const [openFiles, setOpenFiles] = useState(false);
  const handleOpenPending = () => setOpenFiles(!openFiles);

  const [openAllFiles, setOpenAllFiles] = useState(false);
  const handleOpenAllFiles = () => setOpenAllFiles(!openAllFiles);

  const [openAuths, setOpenAuths] = useState(false);
  const handleOpenAuth = () => setOpenAuths(!openAuths);

  const [openDG, setOpenDG] = useState(false);
  const handleOpenDG = () => setOpenDG(!openDG);

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
                  <ListItemButton onClick={() => handleRouteValidate(list)}>
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

      {/* archivos */}
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsFiles}>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleOpenPending}>
            <ListItemIcon>
              <FolderOutlinedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Mis Archivos" />
            {openFiles ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFiles} timeout="auto" unmountOnExit>
            {rutero.online.files.map((list, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  // sx={{ pl: 4 }}
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
      <WithRoleAllowedRoutes allowedRolesList={optionsViewsAllFiles}>
        <List>
          <ListItemButton onClick={handleOpenAllFiles}>
            <ListItemIcon>
              <FolderCopyOutlinedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Archivos" />
            {openAllFiles ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAllFiles} timeout="auto" unmountOnExit>
            {rutero.online.allFiles.map((list, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(`${list.url}`)}>
                  <ListItemIcon>{list.icon}</ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>
        <Divider />
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

      <WithRoleAllowedRoutes allowedRolesList={optionsViewsDigitization}>
        <List>
          <ListItemButton onClick={handleOpenDG}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Gestion Humana" />
            {openDG ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDG} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {rutero.online.digitalizacion.map((list, index) => (
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
