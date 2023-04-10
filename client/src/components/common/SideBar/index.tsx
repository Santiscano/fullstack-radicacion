import { useState } from "react";
import Drawer from "@mui/material/Drawer";
// components mui
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// icons mui
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";

import rutero from "../../../routes/RutesSidebar";
import { Link, useNavigate } from "react-router-dom";
import enviexpress from "../../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import working from "../../../assets/icons/data-analysis-case-study.png";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { session } from "../../tools/SesionSettings";
import { WithRoleAllowedRoutes } from "./../../../Middlewares/WithRoleAllowed";
import {
  optionsViewsSettled,
  optionsViewsAuth,
  optionsViewsAllFiles,
  optionsViewsTI,
  optionsViewsDigitization,
} from "../../tools/OptionsValuesSelects";

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

  const [openFiles, setOpenFiles] = useState(false);
  const handleOpenFiles = () => setOpenFiles(!openFiles);

  const [openAuths, setOpenAuths] = useState(false);
  const handleOpenAuth = () => setOpenAuths(!openAuths);

  const [openDG, setOpenDG] = useState(false);
  const handleOpenDG = () => setOpenDG(!openDG);

  const handleRouteValidate = (nav: any) => {
    console.log("session", session());
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

      <WithRoleAllowedRoutes allowedRolesList={optionsViewsSettled}>
        <List>
          <ListItemButton onClick={handleOpenFiles}>
            <ListItemIcon>
              <AssignmentRoundedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Radicados" />
            {openFiles ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFiles} timeout="auto" unmountOnExit>
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
        <Divider />
      </WithRoleAllowedRoutes>

      <WithRoleAllowedRoutes allowedRolesList={optionsViewsAuth}>
        <List>
          <ListItemButton onClick={handleOpenAuth}>
            <ListItemIcon>
              <VerifiedRoundedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Autorizaciones" />
            {openAuths ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAuths} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {rutero.online.authorizations.map((list, index) => (
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
        <Divider />
      </WithRoleAllowedRoutes>

      <WithRoleAllowedRoutes allowedRolesList={optionsViewsAllFiles}>
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
        {/* <Divider /> */}
      </WithRoleAllowedRoutes>

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

      <WithRoleAllowedRoutes allowedRolesList={optionsViewsDigitization}>
        <List>
          <ListItemButton onClick={handleOpenDG}>
            <ListItemIcon>
              <CreateNewFolderRoundedIcon sx={{ color: "#293184" }} />
            </ListItemIcon>
            <ListItemText primary="Digitalización" />
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
