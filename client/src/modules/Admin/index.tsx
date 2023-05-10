import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { session } from "../../components/tools/SesionSettings";
import { validateUserFirebase } from "../../services/Firebase.routes";
import useContextProvider from "./../../Context/GeneralValuesContext";
import "./admin.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useUserSession } from "../../redux/Redux-actions/useUserSession";

// width drawer desplegable
const drawerWidth = 240;

// info main "layout"
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// NAVBAR "appbar"
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// SIDEBAR "drawer"
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// METODOS
function index() {
  const {
    setUser,
    openSnackbar,
    TransitionLeft,
    handleCloseSnackbar,
    severitySnackbar,
    messageSnackbar,
  } = useContextProvider();
  const { addUserSession } = useUserSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  // open & close menu user avatar
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /**
   * validamos usuario
   * ?setUser crea el usuario con la respuesta
   */
  const loadingUser = async () => {
    const userValidate = await validateUserFirebase();
    console.log('userValidate admin: ', userValidate);
    if ( userValidate?.status === 200 && userValidate?.data.data.users_status === "ACTIVO" ) {
      setUser(userValidate?.data.data);
      addUserSession(userValidate?.data.data);
    } else if (!session() && userValidate?.data.users_status !== "ACTIVO") {
      navigate("/login");
    } else if (userValidate?.data.users_status !== "ACTIVO") {
      navigate("/forbidden403");
    }
  };

  useEffect(() => {
    loadingUser();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
        <CssBaseline />

        {loading ? (
          <div className="w-screen h-screen flex flex-col justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <NavBar handleDrawerOpen={handleDrawerOpen} open={open} />

            <SideBar open={open} handleDrawerClose={handleDrawerClose} />

            <Main open={open} sx={{ padding: 0 }}>
              <DrawerHeader />
              <main className="layout">
                <section className="layout-section">
                  <div className="layout-left">
                    <Outlet />
                  </div>
                </section>
              </main>
            </Main>
            {openSnackbar && (
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                TransitionComponent={TransitionLeft}
                onClose={handleCloseSnackbar}
                style={{ height: "70px" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={severitySnackbar}
                  sx={{
                    width: "100%",
                    height: "40px",
                    fontSize: "18px",
                  }}
                >
                  {messageSnackbar}
                </Alert>
              </Snackbar>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default index;
