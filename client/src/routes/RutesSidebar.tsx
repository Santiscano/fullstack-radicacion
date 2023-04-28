import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import { get, roles } from "../components/tools/SesionSettings";

const color = { color: "#293184" };

export default {
  online: {
    settling: [
      {
        name: "Generar",
        url: "/dashboard/radicar",
        icon: <HistoryEduRoundedIcon sx={color} />,
      },
      {
        name: "Adjuntar",
        url: "/dashboard/adjuntar",
        icon: <AttachEmailIcon sx={color} />,
      },
    ],
    authorizations: [
      {
        name: `${
          Number(get("idroles")) == roles.Administrador
            ? "Completadas"
            : "Pendientes"
        }`,
        url: "/dashboard/pendientes",
        icon: <PendingActionsRoundedIcon sx={color} />,
      },
    ],
    allFiles: [
      {
        name: "Todos los archivos",
        url: "/dashboard/todos-los-archivos",
        icon: <TopicRoundedIcon sx={color} />,
      },
    ],
    ti: [
      {
        name: "Administracion Web",
        url: "/dashboard/admin",
        icon: <LogoDevIcon sx={color} />,
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
