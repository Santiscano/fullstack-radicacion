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
export const optionWorkingModality = [
  'PRESENCIAL',
  'TRABAJO EN CASA',
  'REMOTO',
];
export const optionHomeTenure = [
  'PROPIA',
  'ARRENDADA',
  'FAMILIAR'
];
export const optionTypeTransport = [
  'CAMINANDO',
  'BICICLETA',
  'MOTO',
  'TRANSPORTE PUBLICO',
  'VEHICULO PARTICULAR PROPIO'
];
export const optionSportFrequency = [
  'OCASIONAL',
  'MENSUAL',
  'SEMENAL',
  'DIARIO',
  'NINGUNO'
];
export const optionIsActive = [
  'ACTIVO',
  'INACTIVO',
];
export const optionCediHiring = [
  'MEDELLÍN',
  'BOGOTÁ',
  'CALI',
  'BARRANQUILLA',
  'LD',
  'HERMECO'
];
export const optionRH = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-'
];
export const optionCivilStatus = [
  'SOLTERO',
  'UNION LIBRE',
  'CASADO',
  'DIVORCIADO',
  'VIUDO'
];
export const optionGenero = [
  'HOMBRE',
  'MUJER'
];
export const optionAcademicLevel = [
  'SIN ESTUDIOS',
  'PRIMARIA',
  'BACHILLER',
  'TECNICO',
  'TECNOLOGO',
  'PREGRADO',
  'POST-GRADO',
  'MAESTRIA',
  'DOCTORADO',
  'POST-DOCTORADO',
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
export const optionsViewsHumanManagement = [
  roles.Administrador, roles.AuditorGH,
];
export const optionsViewsDevelopment = [
  roles.Administrador
];
