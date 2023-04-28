import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { get, roles } from "../components/tools/SesionSettings";

const color = { color: "#293184" };

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
        icon: <PendingActionsRoundedIcon sx={color} />,
      },
      {
        name: "Historial",
        url: "/dashboard/historial",
        icon: <RestoreOutlinedIcon sx={{ color: "#293184" }} />,
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
        icon: <AdminPanelSettingsOutlinedIcon sx={color} />,
      },
    ],
    CenterCost: [
      {
        name: "Centros De Costos",
        url: "/dashboard/centros-de-costos",
        icon: <QueryStatsIcon sx={color} />,
      },
    ],
    digitalizacion: [
      {
        name: "Crear Empleados",
        url: "/dashboard/nuevo-empleado",
        icon: <PersonAddAltRoundedIcon sx={color} />,
      },
      {
        name: "Todos los Empleados",
        url: "/dashboard/todos-los-empleados",
        icon: <GroupsRoundedIcon sx={color} />,
      },
      {
        name: "Adjuntar Documentos Empleado",
        url: "/dashboard/adjuntar-documentos-empleado",
        icon: <PostAddRoundedIcon sx={color} />,
      },
      {
        name: "Filtrar Empleado",
        url: "/dashboard/buscar-empleado",
        icon: <SearchRoundedIcon sx={color} />,
      },
    ],
  },
  offline: {},
};
