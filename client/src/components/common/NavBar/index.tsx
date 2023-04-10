import { useState } from "react";

// components mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

// myself components

// icons mui
import MenuIcon from "@mui/icons-material/Menu";

// react-router-dom
import { useNavigate } from "react-router-dom";

// img
import logo from "../../../assets/images/logo-white.png";
import userIcon from "../../../assets/icons/avatar.png";

// css
import "./navbar.css";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import {
  get,
  remove,
  removeAll,
  viewDisplayRol,
} from "../../tools/SesionSettings";
import { useContext } from "react";
import { GeneralValuesContext } from "../../../Context/GeneralValuesContext";

export default function MenuAppBar(props: any) {
  // navigation
  const navigate = useNavigate();

  const { user } = useContext(GeneralValuesContext);
  // @ts-ignore
  const { users_name, users_lastname, idroles, roles } = user;

  // menu avatar
  const menuAvatar = [
    {
      name: "Cerrar Sesion",
      navigate: "/login",
      handleClick: () => {
        removeAll();
        navigate("/login");
      },
    },
  ];
  // menu notifications
  const menuNotifications = [
    {
      name: "notificacion 1",
      navigate: "/",
    },
    {
      name: "notificacion 2",
      navigate: "/",
    },
  ];

  // open & close menu user avatar
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // open & close menu notifications
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);
  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
    setCountNotification(0);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };
  // toggle badgeNotifications
  const [countNotification, setCountNotification] = useState(5);
  // esta ⬇ funcion es para incrementar el numero de notificaciones con la DB
  const increaseNotificationsDB = () => {
    setCountNotification(countNotification + 1);
  };
  // dark mode
  const [isDark, setIsDark] = useState(false);
  const handleMode = () => setIsDark(!isDark);

  const handleLogo = () => {
    navigate("/dashboard/home");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          size="large"
          edge="start"
          onClick={props.handleDrawerOpen}
          sx={{ mr: 1, ...(props.open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={logo}
          className="mx-3 cursor-pointer"
          style={{ width: "110px", height: "auto" }}
          onClick={handleLogo}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

        {/* image */}
        <Box sx={{ flexGrow: 0, display: "flex" }}>
          <Typography
            sx={{
              mx: 3,
              my: 1,
              display: { xs: "none", sm: "none", md: "block" },
            }}
            style={{ textAlign: "center" }}
            component="div"
          >
            <b>
              {users_name} {users_lastname}
            </b>
            <br />
            <div>{roles}</div>
          </Typography>
          <Tooltip title="Abrir Menu">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src={userIcon}
                style={{ objectFit: "fill" }}
              />
            </IconButton>
          </Tooltip>

          {/* menu avatar */}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menuAvatar.map((setting, index) => (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    setting.handleClick();
                  }}
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* menu notifications */}
          <Menu
            sx={{ mt: "45px" }}
            id="notification-appbar"
            anchorEl={anchorElNotification}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNotification)}
            onClose={handleCloseNotification}
          >
            {menuNotifications.map((notification, index) => (
              <MenuItem key={index} onClick={handleCloseNotification}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate(notification.navigate)}
                >
                  {notification.name}{" "}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
