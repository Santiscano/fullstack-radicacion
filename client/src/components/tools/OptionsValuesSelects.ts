import { roles } from "./SesionSettings";

export const optionsInvoiceType = [
  'ADMINISTRATIVO',
  'OPERATIVO'
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
  'MANIFIESTO CARGA'
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
export const optionsViewsFiles = [
  roles.AuditorGH, roles.AuditorCRTL,
  roles.AuditorRG, roles.AuditorTI, roles.Gerencia,
  roles.Contabilidad, roles.Tesoreria,  roles.Administrador,
];
export const optionsViewsAllFiles = [
  roles.Radicacion, roles.Administrador,
  roles.Gerencia, roles.Contabilidad, roles.Tesoreria,
  roles.AuditorGH, roles.AuditorCRTL, roles.AuditorRG, roles.AuditorTI
];
export const optionsViewsNotAuditors = [
  roles.Administrador, roles.Contabilidad, roles.Gerencia,
  roles.Radicacion, roles.Tesoreria
];
export const optionsViewsTI = [
  roles.Contabilidad, roles.Administrador, roles.AuditorTI
];
export const optionsViewTraking = [
  roles.Administrador, roles.Gerencia, roles.Contabilidad, roles.Tesoreria
];
export const optionsViewsDigitization = [
  roles.Administrador
];
