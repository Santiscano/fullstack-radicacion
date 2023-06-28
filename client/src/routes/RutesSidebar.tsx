import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { get, roles } from "../components/tools/SesionSettings";
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

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
    ],
    allFiles: [
      {
        name: "Todos los archivos",
        url: "/dashboard/todos-los-archivos",
        icon: <TopicOutlinedIcon sx={{ color: "#293184" }} />,
      },
    ],
    traceability: [
      {
        name: "Trazabilidad",
        url: "/dashboard/trazabilidad",
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
        name: "Centros de Costo",
        url: "/dashboard/centros-de-costos",
        icon: <QueryStatsIcon sx={color} />,
      },
    ],
    humanManagement: [
      {
        name: "Crear Empleados",
        url: "/dashboard/nuevo-empleado",
        icon: <PersonAddAlt1OutlinedIcon sx={color} />,
      },
      {
        name: "test crear",
        url: "/dashboard/test",
        icon: <GroupsOutlinedIcon sx={color} />,
      },
      {
        name: "Todos los Empleados",
        url: "/dashboard/todos-los-empleados",
        icon: <GroupsOutlinedIcon sx={color} />,
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
    dev: [
      {
        name: "Mover Elementos Mouse",
        url: "/dashboard/mover-elementos-mouse",
        icon: <MouseOutlinedIcon sx={color} />,
      },
      {
        name: "Generar Codigo QR",
        url: "/dashboard/qr",
        icon: <QrCode2Icon sx={color} />,
      },
      {
        name: "Web Viewer",
        url: "/dashboard/excel",
        icon: <TextSnippetRoundedIcon/>,
      },
      {
        name: "vista en construccion",
        url: "/dashboard/vista-en-construccion",
        icon: <ConstructionOutlinedIcon/>,
      },
    ],
  },
  offline: {},
};
