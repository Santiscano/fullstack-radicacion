import { roles } from "./SesionSettings";

export const optionsInvoiceType = [
  'Administrativo',
  'Operativo'
];
export const optionsProvider = [
  'Servientrega',
  'Exito medellin'
];
export const optionsRedirectToOperativo = [
  'Grupo Operativo'
]
export const optionAccountType = [
  'CUENTA COBRO',
  'FACTURA PROVEEDOR',
];
export const optionDocumentType = [
  'CEDULA CIUDADANIA',
  'NIT',
  'CEDULA EXTRANJERIA',
  'PASAPORTE',
];
export const optionCediType = [
  'PROPIA',
  'NACIONAL',
];
export const optionsActivity = [
  {name:'APROBAR', value:2 },
  {name:'RECHAZAR', value:3 },
  {name:'DEVOLVER', value:4 },
  {name:'PENDIENTE/TEMPORAL', value:5 },
];
export const optionsCostCenter = [
  {name: 'Administracion', value: '01'},
  {name: 'Nombre 2', value: '02'},
  {name: 'Nombre 3', value: '03'},
  {name: 'Nombre 4', value: '04'},
]

// esto es lo unico que deberia mover para los permisos de cada vista.
export const optionsViewsSettled = [
  roles.Radicacion, roles.Administrador
];
export const optionsViewsAuth = [
  roles.AuditorGH, roles.AuditorCRTL,
  roles.AuditorRG, roles.AuditorTI, roles.Gerencia,
  roles.Contaduria, roles.Tesoreria,  roles.Administrador,
];
export const optionsViewsAllFiles = [
  roles.Radicacion, roles.Administrador,
  roles.Gerencia, roles.Contaduria, roles.Tesoreria,
];
export const optionsViewsTI = [
  roles.Contaduria, roles.Administrador,
];
export const optionsViewsDigitization = [
  roles.Administrador
];
