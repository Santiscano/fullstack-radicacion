import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { get, roles } from "../components/tools/SesionSettings";

export default {
  online: {
    settling: [
      {
        name: "Generar",
        url: "/dashboard/radicar",
        icon: <HistoryEduRoundedIcon sx={{ color: "#293184" }} />,
      },
      {
        name: "Adjuntar",
        url: "/dashboard/adjuntar",
        icon: <AttachEmailIcon sx={{ color: "#293184" }} />,
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
        icon: <PendingActionsRoundedIcon sx={{ color: "#293184" }} />,
      },
    ],
    allFiles: [
      {
        name: "Todos los archivos",
        url: "/dashboard/todos-los-archivos",
        icon: <TopicRoundedIcon sx={{ color: "#293184" }} />,
      },
    ],
    ti: [
      {
        name: "Administracion Web",
        url: "/dashboard/admin",
        icon: <LogoDevIcon sx={{ color: "#293184" }} />,
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
