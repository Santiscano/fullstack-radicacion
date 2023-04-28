import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { get, roles } from "../components/tools/SesionSettings";

export default {
  online: {
    settling: [
      {
        name: "Generar",
        url: "/dashboard/radicar",
        icon: <HistoryEduIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Adjuntar",
        url: "/dashboard/adjuntar",
        icon: <AttachEmailOutlinedIcon sx={{ color: "#293184" }} />,
      },
    ],
    files: [
      {
        name: `${
          Number(get("idroles")) == roles.Administrador
            ? "Completadas"
            : "Pendientes"
        }`,
        url: "/dashboard/pendientes",
        icon: <PendingActionsRoundedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Historial",
        url: "/dashboard/historial",
        icon: <RestoreOutlinedIcon sx={{ color: "#293184" }} />,
      },
    ],
    allFiles: [
      {
        name: "Todos los archivos",
        url: "/dashboard/todos-los-archivos",
        icon: <TopicOutlinedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Trazabilidad",
        url: "/dashboard/tracking",
        icon: <EqualizerIcon sx={{ color: "#293184" }} />,
      },
    ],
    ti: [
      {
        name: "Administracion Web",
        url: "/dashboard/admin",
        icon: <AdminPanelSettingsOutlinedIcon sx={{ color: "#293184" }} />,
      },
    ],
    digitalizacion: [
      {
        name: "Crear Empleados",
        url: "/dashboard/nuevo-empleado",
        icon: <PersonAddAltRoundedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Todos los Empleados",
        url: "/dashboard/todos-los-empleados",
        icon: <GroupsRoundedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Adjuntar Documentos Empleado",
        url: "/dashboard/adjuntar-documentos-empleado",
        icon: <PostAddRoundedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Filtrar Empleado",
        url: "/dashboard/buscar-empleado",
        icon: <SearchRoundedIcon sx={{ color: "#293184" }} />,
      },
    ],
  },
  offline: {},
};
