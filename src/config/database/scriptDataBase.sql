-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-04-2023 a las 18:42:43
-- Versión del servidor: 10.6.10-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u722911909_digitalizacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cost_center`
--

CREATE TABLE `cost_center` (
  `idcost_center` int(11) NOT NULL,
  `idcost_center_subarea` int(11) NOT NULL,
  `cost_center` varchar(2) COLLATE utf8mb3_spanish_ci NOT NULL,
  `cost_center_name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `cost_center`
--

INSERT INTO `cost_center` (`idcost_center`, `idcost_center_subarea`, `cost_center`, `cost_center_name`) VALUES
(1, 1, '01', 'REGISTRO'),
(3, 6, '15', 'TEST CENTRO DE COSTOS'),
(4, 8, '90', 'COST-SANTI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cost_center_area`
--

CREATE TABLE `cost_center_area` (
  `idcost_center_area` int(11) NOT NULL,
  `cost_center_area` varchar(2) COLLATE utf8mb3_spanish_ci NOT NULL,
  `cost_center_area_name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `cost_center_area`
--

INSERT INTO `cost_center_area` (`idcost_center_area`, `cost_center_area`, `cost_center_area_name`) VALUES
(1, '01', 'ADMINISTRATIVO'),
(6, '02', 'ADMINISTRATIVO'),
(9, '19', 'PRIMER CENTRO DE COSTOS'),
(10, '98', 'PRIMER CENTRO DE COSTOS'),
(11, '97', 'PRIMER CENTRO DE COSTOS'),
(12, '23', 'FSDSWEFW'),
(14, '99', 'TEST CREATE AREA'),
(15, '90', 'SANTI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cost_center_subarea`
--

CREATE TABLE `cost_center_subarea` (
  `idcost_center_subarea` int(11) NOT NULL,
  `idcost_center_area` int(11) NOT NULL,
  `cost_center_subarea` varchar(2) COLLATE utf8mb3_spanish_ci NOT NULL,
  `cost_center_subarea_name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `cost_center_subarea`
--

INSERT INTO `cost_center_subarea` (`idcost_center_subarea`, `idcost_center_area`, `cost_center_subarea`, `cost_center_subarea_name`) VALUES
(1, 1, '01', 'REGISTRO'),
(6, 6, '99', 'TEST SUBAREA'),
(7, 14, '98', 'TEST SUBAREA 98'),
(8, 15, '90', 'SUB-SANTI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `idfiles` int(11) NOT NULL,
  `idproviders` int(11) NOT NULL,
  `idusers` int(11) NOT NULL,
  `idfiles_states` int(11) NOT NULL DEFAULT 1,
  `idsedes` int(11) NOT NULL,
  `files_type` enum('ADMINISTRATIVO','OPERATIVO') COLLATE utf8mb3_spanish_ci NOT NULL,
  `files_registered` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `files_cost_center` varchar(6) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `files_code_accounting` varchar(45) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `files_code_treasury` varchar(45) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `files_price` int(11) NOT NULL DEFAULT 0,
  `files_account_type` enum('CUENTA COBRO','FACTURA PROVEEDOR','MANIFIESTO CARGA') COLLATE utf8mb3_spanish_ci NOT NULL,
  `files_account_type_number` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `files`
--

INSERT INTO `files` (`idfiles`, `idproviders`, `idusers`, `idfiles_states`, `idsedes`, `files_type`, `files_registered`, `files_cost_center`, `files_code_accounting`, `files_code_treasury`, `files_price`, `files_account_type`, `files_account_type_number`) VALUES
(180, 42, 1, 6, 1, 'ADMINISTRATIVO', '1-MEDELLÍN-2432023T10:15:10AM', '010101', NULL, NULL, 9876543, 'FACTURA PROVEEDOR', '5678H-JUGFD'),
(181, 56, 64, 4, 1, 'ADMINISTRATIVO', '181-MEDELLÍN-2432023T3:57:01PM', '010101', NULL, NULL, 2147483647, 'CUENTA COBRO', 'FDGDFG'),
(182, 42, 1, 6, 1, 'ADMINISTRATIVO', '182-MEDELLÍN-2432023T3:57:46PM', '010101', NULL, '234', 6752, 'CUENTA COBRO', 'FDGDFG'),
(183, 56, 55, 3, 1, 'ADMINISTRATIVO', '183-MEDELLÍN-2732023T8:55:22AM', '010101', NULL, NULL, 76542312, 'CUENTA COBRO', '65-F34-3F'),
(184, 62, 65, 5, 1, 'ADMINISTRATIVO', '184-MEDELLÍN-2732023T3:37:58PM', '010101', '7598347523', NULL, 5431235, 'CUENTA COBRO', '76543424-RE2'),
(185, 42, 55, 3, 1, 'ADMINISTRATIVO', '185-MEDELLÍN-2732023T4:46:46PM', '010101', NULL, NULL, 45678, 'CUENTA COBRO', '78-HGGH'),
(186, 42, 55, 3, 1, 'ADMINISTRATIVO', '186-MEDELLÍN-2732023T7:08:22PM', '010101', NULL, NULL, 65432345, 'CUENTA COBRO', '54FVD34'),
(187, 42, 55, 3, 1, 'ADMINISTRATIVO', '187-MEDELLÍN-2732023T8:50:05PM', '010101', NULL, NULL, 6543, 'CUENTA COBRO', '5TRFG-67'),
(188, 56, 64, 4, 2, 'ADMINISTRATIVO', '188-CALI-2932023T4:17:57PM', '010101', NULL, NULL, 5245, 'CUENTA COBRO', '342-FWE'),
(189, 60, 1, 11, 2, 'ADMINISTRATIVO', '189-CALI-2932023T4:50:29PM', NULL, NULL, NULL, 543210, 'CUENTA COBRO', '54-3-2-1'),
(190, 56, 1, 6, 1, 'ADMINISTRATIVO', '190-MEDELLÍN-2932023T4:51:53PM', '909090', '90-tes-acounting', '90-code-treasury', 7654324, 'CUENTA COBRO', '54-3-2-1'),
(191, 42, 43, 9, 1, 'ADMINISTRATIVO', '191-MEDELLÍN-2932023T4:52:26PM', NULL, NULL, NULL, 3432344, 'CUENTA COBRO', '54-3-2-1'),
(192, 42, 43, 1, 1, 'ADMINISTRATIVO', '192-MEDELLÍN-2932023T4:53:17PM', NULL, NULL, NULL, 23423423, 'CUENTA COBRO', '54-3-2-1'),
(194, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-12345', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(195, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-1234Ñ5', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(196, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-1238Ñ5', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(197, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-128Ñ5', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(198, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-123', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(199, 42, 1, 1, 1, 'ADMINISTRATIVO', '123-MEDAYORK-1234', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(200, 42, 1, 1, 1, 'ADMINISTRATIVO', '1852-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(201, 61, 43, 1, 5, 'ADMINISTRATIVO', '201-CALI -3032023T4:20:24PM', NULL, NULL, NULL, 53423, 'CUENTA COBRO', '534-F34'),
(202, 42, 1, 1, 1, 'ADMINISTRATIVO', '18521-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(203, 42, 1, 1, 1, 'ADMINISTRATIVO', '12-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(204, 42, 1, 1, 1, 'ADMINISTRATIVO', '13-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(205, 42, 1, 1, 1, 'ADMINISTRATIVO', '14-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(206, 42, 1, 1, 1, 'ADMINISTRATIVO', '15-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456'),
(207, 42, 1, 1, 1, 'ADMINISTRATIVO', '16-MEDELLÍN-2732023T4:46:46PM', NULL, NULL, NULL, 1234567, 'CUENTA COBRO', 'DGA123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files_path`
--

CREATE TABLE `files_path` (
  `idfiles_path` int(11) NOT NULL,
  `idfiles` int(11) DEFAULT NULL,
  `files_path` varchar(256) COLLATE utf8mb3_spanish_ci NOT NULL,
  `files_path_date` datetime NOT NULL,
  `files_path_observation` varchar(256) COLLATE utf8mb3_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `files_path`
--

INSERT INTO `files_path` (`idfiles_path`, `idfiles`, `files_path`, `files_path_date`, `files_path_observation`) VALUES
(1, 180, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/1-MEDELLÍN-2432023T10:15:10AM-1.pdf?authuser=3', '2023-03-24 10:16:14', 'PA QUE LO FINANCIEN'),
(2, 181, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/181-MEDELLÍN-2432023T3:57:01PM-1.pdf?authuser=3', '2023-03-24 15:57:32', 'SDFSDVGWG'),
(3, 182, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/182-MEDELLÍN-2432023T3:57:46PM-1.pdf?authuser=3', '2023-03-24 15:58:08', 'DGFSDMNBL'),
(4, 183, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/183-MEDELLÍN-2732023T8:55:22AM-1.pdf?authuser=3', '2023-03-27 08:57:06', 'FLUJO 1 GH'),
(5, 183, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/183-MEDELLÍN-2732023T8:55:22AM-2.pdf?authuser=3', '2023-03-27 09:34:36', 'ARCHIVO 2 ADJUNTADO'),
(6, 183, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/183-MEDELLÍN-2732023T8:55:22AM-3.pdf?authuser=3', '2023-03-27 09:35:25', 'ARCHIVO 3 ADJUNTADO'),
(7, 183, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/183-MEDELLÍN-2732023T8:55:22AM-4.pdf?authuser=3', '2023-03-27 09:35:43', 'ARCHIVO 4'),
(8, 184, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/184-MEDELLÍN-2732023T3:37:58PM-1.pdf?authuser=3', '2023-03-27 15:39:00', 'CREE EL RADICADO'),
(9, 186, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/186-MEDELLÍN-2732023T7:08:22PM-1.pdf?authuser=3', '2023-03-27 19:09:02', 'MKWJFBLA'),
(10, 187, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/187-MEDELLÍN-2732023T8:50:05PM-1.pdf?authuser=3', '2023-03-27 20:50:52', 'PRIMERO SE CAMBIARA A ESTADO DEVUELTO'),
(11, 180, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/1-MEDELLÍN-2432023T10:15:10AM-2.pdf?authuser=3', '2023-03-28 15:34:47', 'INTENTO 1 DE ENVIAR A FINALIZADO USUARIO 1'),
(12, 188, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/188-CALI-2932023T4:17:57PM-1.pdf?authuser=3', '2023-03-29 16:18:39', 'DIRECTAMENTE A GERENCIA'),
(13, 189, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/189-CALI-2932023T4:50:29PM-1.pdf?authuser=3', '2023-03-29 16:51:15', 'MENSAJE 1'),
(14, 190, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/190-MEDELLÍN-2932023T4:51:53PM-1.pdf?authuser=3', '2023-03-29 16:52:17', '2342C'),
(15, 191, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/191-MEDELLÍN-2932023T4:52:26PM-1.pdf?authuser=3', '2023-03-29 16:53:07', '234'),
(16, 192, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/192-MEDELLÍN-2932023T4:53:17PM-1.pdf?authuser=3', '2023-03-29 16:53:37', '234C23D234D234D'),
(17, 190, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/190-MEDELLÍN-2932023T4:51:53PM-2.pdf?authuser=3', '2023-03-29 17:28:51', 'ASIGNO FILE CODE TREASURE Y AGREGO UN NUEVO ARCHIVO PDF COMO RESULTADO FINAL'),
(18, 182, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/182-MEDELLÍN-2432023T3:57:46PM-2.pdf?authuser=3', '2023-03-31 15:22:59', 'EWCFWC'),
(19, 198, 'https://storage.cloud.google.com/digitalizacion-enviexpress-bucket/radicacion/administrativo/123-MEDAYORK-123-1.pdf?authuser=3', '2023-04-03 11:14:15', 'DAVID LE TIEMBLAN LAS NALGUITAS DONDE ESTO NO SUBA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files_states`
--

CREATE TABLE `files_states` (
  `idfiles_states` int(11) NOT NULL,
  `files_states` varchar(90) COLLATE utf8mb3_spanish_ci NOT NULL,
  `files_states_description` varchar(90) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `files_states`
--

INSERT INTO `files_states` (`idfiles_states`, `files_states`, `files_states_description`) VALUES
(1, 'ASIGNADO', 'INICIO DEL TRAMITE DE CADA UNA DE LAS PERSONAS'),
(2, 'ARCHIVO CARGADO', 'CARGA DE UN DOCUMENTO AL SERVIDOR'),
(3, 'APROBADO AUDITOR', 'APROBACIÓN DEL AUDITOR'),
(4, 'APROBADO GERENTE', 'APROBACIÓN DEL GERENTE'),
(5, 'APROBADO CONTABILIDAD', 'APROBACIÓN DE CONTABILIDAD'),
(6, 'FINALIZADO', 'FIN DEL FLUJO'),
(7, 'RECHAZADO', 'EL DOCUMENTO NO CUMPLE CON LOS REQUISITOS'),
(8, 'REMITIR', 'CAMBIO DEL RESPONSABLE DE GESTIÓN'),
(9, 'PENDIENTE', 'FALTA DE GESTIÓN DEL TERCERO'),
(10, 'TEMPORAL', 'FALTA DE GESTIÓN INTERNO'),
(11, 'ANULAR', 'NO CUMPPLE CON LA INFORMACIÓN ESTABLECIDA Y SE ARCHIVA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idroles` int(11) NOT NULL,
  `roles` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `roles_description` varchar(256) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idroles`, `roles`, `roles_description`) VALUES
(1, 'PROVEEDOR', 'PROVEEDOR / TERCERO'),
(2, 'RADICACIÓN', 'RADICACIÓN'),
(3, 'GESTIÓN HUMANA', 'AUDITOR'),
(4, 'CONTROL', 'AUDITOR'),
(5, 'RIESGOS', 'AUDITOR'),
(6, 'GERENCIA', 'AUDITOR'),
(7, 'CONTADURIA', 'AUDITOR'),
(8, 'TESORERIA', 'AUDITOR'),
(9, 'TECNOLOGÍA', 'AUDITOR'),
(10, 'ADMINISTRADOR', 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `idsedes` int(11) NOT NULL,
  `sedes_country` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sedes_city` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sedes_state` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sedes_address` varchar(256) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sedes_name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sedes_type` enum('PROPIA','NACIONAL') COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`idsedes`, `sedes_country`, `sedes_city`, `sedes_state`, `sedes_address`, `sedes_name`, `sedes_type`) VALUES
(1, 'COLOMBIA', 'MEDELLÍN', 'ANTIOQUIA', 'CALLE 30A # 65B - 59, BARRIO FATIMA', 'SOLUCIONES ENVIEXPRESS - MEDELLÍN', 'PROPIA'),
(2, 'COLOMBIA', 'CALI', 'VALLE DEL CAUCA', 'CARRERA 37 #10 - 197, BODEGA 10 (YUMBO)', 'SOLUCIONES ENVIEXPRESS - CALI', 'PROPIA'),
(3, 'COLOMBIA', 'BOGOTÁ', 'BOGOTÁ D.C.', 'CARRERA 65 # 17 - 96, BARRIO PUENTE ARANDA', 'SOLUCIONES ENVIEXPRESS - BOGOTÁ', 'PROPIA'),
(4, 'COLOMBIA', 'BARRANQUILLA', 'ATLÁNTICO', 'AV. CIRCUNVALAR # 3 - 367, BODEGA 6 EUROPARK', 'SOLUCIONES ENVIEXPRESS - BARRANQUILLA', 'PROPIA'),
(5, 'COLOMBIA', 'CALI ', 'VALLE DEL CAUCA', 'CARRERA 24B # 43-35, BARRIO ASTURIA', 'DAISSY DIAZ ORTEGA', 'NACIONAL');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `ShowTable`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `ShowTable` (
`idfiles` int(11)
,`idproviders` int(11)
,`idusers` int(11)
,`idfiles_states` int(11)
,`idsedes` int(11)
,`files_type` enum('ADMINISTRATIVO','OPERATIVO')
,`files_registered` varchar(45)
,`files_cost_center` varchar(6)
,`files_code_accounting` varchar(45)
,`files_code_treasury` varchar(45)
,`files_price` int(11)
,`files_account_type` enum('CUENTA COBRO','FACTURA PROVEEDOR','MANIFIESTO CARGA')
,`files_account_type_number` varchar(45)
,`sedes_country` varchar(45)
,`sedes_city` varchar(45)
,`sedes_state` varchar(45)
,`sedes_address` varchar(256)
,`sedes_name` varchar(45)
,`sedes_type` enum('PROPIA','NACIONAL')
,`UserAssignedRol` int(11)
,`UserAssignedIdentificationType` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA')
,`UserAssignedIdentification` varchar(45)
,`UserAssignedIdenfiticationDigitalCheck` varchar(1)
,`UserAssignedName` varchar(45)
,`UserAssignedLastname` varchar(45)
,`UserAssignedAddress` varchar(256)
,`UserAssignedPhone` varchar(45)
,`UserAssignedEmail` varchar(256)
,`UserAssignedPaydays` int(11)
,`UserAssignedExpirationDate` date
,`UserAssignedStatus` enum('ACTIVO','INACTIVO')
,`idroles` int(11)
,`users_identification_type` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA')
,`users_identification` varchar(45)
,`users_identification_digital_check` varchar(1)
,`users_name` varchar(45)
,`users_lastname` varchar(45)
,`users_address` varchar(256)
,`users_phone` varchar(45)
,`users_email` varchar(256)
,`users_providers_paydays` int(11)
,`users_providers_expiration_date` date
,`users_status` enum('ACTIVO','INACTIVO')
,`files_states` varchar(90)
,`files_states_description` varchar(90)
,`UserAssignedRoles` varchar(45)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tracking`
--

CREATE TABLE `tracking` (
  `idtracking` int(11) NOT NULL,
  `idfiles_states` int(11) NOT NULL,
  `idfiles` int(11) NOT NULL,
  `idusers` int(11) NOT NULL,
  `tracking_date` datetime NOT NULL,
  `tracking_observation` varchar(256) COLLATE utf8mb3_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tracking`
--

INSERT INTO `tracking` (`idtracking`, `idfiles_states`, `idfiles`, `idusers`, `tracking_date`, `tracking_observation`) VALUES
(1, 1, 180, 44, '2023-03-24 10:15:43', 'INICIO DEL PROCESO DEL 1-MEDELLÍN-2432023T10:15:10AM EXITOSO'),
(2, 2, 180, 44, '2023-03-24 10:16:15', 'PA QUE LO FINANCIEN'),
(3, 9, 180, 43, '2023-03-24 14:59:44', 'TEST-1 ENVIO A PENDIENTE'),
(4, 10, 180, 43, '2023-03-24 15:08:37', 'TEST-1 AHORA ENVIO A TEMPORAL'),
(5, 9, 180, 43, '2023-03-24 15:09:29', 'ADFSDF'),
(6, 10, 180, 43, '2023-03-24 15:47:19', 'PROBANDO USECONTEXTO'),
(7, 1, 181, 44, '2023-03-24 15:57:22', 'INICIO DEL PROCESO DEL 181-MEDELLÍN-2432023T3:57:01PM EXITOSO'),
(8, 2, 181, 44, '2023-03-24 15:57:32', 'SDFSDVGWG'),
(9, 1, 182, 44, '2023-03-24 15:57:58', 'INICIO DEL PROCESO DEL 182-MEDELLÍN-2432023T3:57:46PM EXITOSO'),
(10, 2, 182, 44, '2023-03-24 15:58:08', 'DGFSDMNBL'),
(11, 3, 181, 43, '2023-03-25 17:26:49', 'VA EN DIRECCION DEL AUDITOR ESTA APROBACION.'),
(12, 3, 180, 43, '2023-03-25 17:30:49', 'INTENTO 2'),
(13, 3, 180, 43, '2023-03-25 17:31:37', 'DOCUMENTO 2 ENVIADO'),
(14, 1, 183, 44, '2023-03-27 08:56:43', 'INICIO DEL PROCESO DEL 183-MEDELLÍN-2732023T8:55:22AM EXITOSO'),
(15, 2, 183, 44, '2023-03-27 08:57:07', 'FLUJO 1 GH'),
(16, 2, 183, 44, '2023-03-27 09:34:36', 'ARCHIVO 2 ADJUNTADO'),
(17, 2, 183, 44, '2023-03-27 09:35:25', 'ARCHIVO 3 ADJUNTADO'),
(18, 2, 183, 44, '2023-03-27 09:35:43', 'ARCHIVO 4'),
(19, 1, 184, 44, '2023-03-27 15:38:46', 'INICIO DEL PROCESO DEL 184-MEDELLÍN-2732023T3:37:58PM EXITOSO'),
(20, 2, 184, 44, '2023-03-27 15:39:00', 'CREE EL RADICADO'),
(21, 3, 184, 43, '2023-03-27 15:40:30', 'SE FUE A GERENTE'),
(22, 3, 184, 43, '2023-03-27 15:40:40', 'SE FUE A GERENTE'),
(23, 3, 184, 43, '2023-03-27 15:58:42', 'ESTOY LIMPIANDO CAMPOS Y CERRANDO MODAL INTENTO 1'),
(24, 3, 183, 43, '2023-03-27 16:07:49', 'MENSAJE ENVIADO'),
(25, 1, 185, 44, '2023-03-27 16:47:05', 'INICIO DEL PROCESO DEL 185-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(26, 1, 186, 44, '2023-03-27 19:08:44', 'INICIO DEL PROCESO DEL 186-MEDELLÍN-2732023T7:08:22PM EXITOSO'),
(27, 2, 186, 44, '2023-03-27 19:09:02', 'MKWJFBLA'),
(28, 3, 185, 43, '2023-03-27 19:59:31', 'ESTOY ASIGNANDO CENTRO DE COSTOS, NO DEBERIA VOLVERSE A MOSTRAR ADEMAS SE APROVO LA 185 ASI QUE DEBE IR A GERENCIA'),
(29, 3, 185, 43, '2023-03-27 20:00:40', 'INTENTO 2'),
(30, 3, 186, 43, '2023-03-27 20:49:18', 'UJDHGF-4543FSR-SGRS'),
(31, 1, 187, 44, '2023-03-27 20:50:23', 'INICIO DEL PROCESO DEL 187-MEDELLÍN-2732023T8:50:05PM EXITOSO'),
(32, 2, 187, 44, '2023-03-27 20:50:53', 'PRIMERO SE CAMBIARA A ESTADO DEVUELTO'),
(33, 10, 187, 43, '2023-03-27 22:10:13', 'ESTOY DEJANDO UN COMENTARIO CUANDO LO CAMBIO AL ESTADO TEMPORAL'),
(34, 10, 187, 43, '2023-03-27 22:15:16', '3ER INTENTO DE CREAR EL HANDLEACTIVITY SELECT QUE LIMPIARA LA OPCION TEMPORAL Y ADEMAS CERRARA EL MODAL'),
(35, 9, 187, 43, '2023-03-27 22:17:29', 'AHORA ESTOY PASANDO A ESTADO PENDIENTE'),
(36, 10, 187, 43, '2023-03-27 22:25:35', 'ESTOY UTILIZANDO EL ACTUALIZADOR DE USECONTEXT PARA LA MISMA FUNCION DE CERRAR MODAL'),
(37, 9, 187, 43, '2023-03-27 22:25:57', 'PENDIENTE Y TEMPORAL APARENTEMENTE COMPLETA SI ESTO FUNCIONA'),
(38, 8, 187, 43, '2023-03-28 10:31:26', 'SE FUE AL USUARIO SANTIAGO SIERRA'),
(39, 3, 187, 41, '2023-03-28 11:58:42', 'DE TI A GERENTE'),
(40, 4, 182, 55, '2023-03-28 12:29:39', 'PRIMER ASIGNACION FUE  GERENTE AHORA SE ENVIA A CONTABLE'),
(41, 4, 180, 55, '2023-03-28 12:30:15', 'ESTE YA TENIA EL CENTRO DE COSTOS ASIGNADO'),
(42, 5, 180, 64, '2023-03-28 12:31:11', 'AHORA LO ESTA APROBANDO GERENCIA Y VA PARA TESORERIA'),
(43, 5, 182, 64, '2023-03-28 12:31:56', '2DO DOCUMENTO APROVADO POR CONTABILIDAD'),
(44, 6, 180, 65, '2023-03-28 15:34:44', 'INTENTO 1 DE ENVIAR A FINALIZADO USUARIO 1'),
(45, 2, 180, 65, '2023-03-28 15:34:47', 'INTENTO 1 DE ENVIAR A FINALIZADO USUARIO 1'),
(46, 4, 184, 55, '2023-03-28 23:07:39', 'VA A CONTABLE'),
(47, 5, 184, 64, '2023-03-29 00:12:03', 'AGREGUE EL VALOR DE CODIGO CONTABILIDAD; FILES_CODE_ACCOUNTING'),
(48, 1, 188, 1, '2023-03-29 16:18:24', 'INICIO DEL PROCESO DEL 188-CALI-2932023T4:17:57PM EXITOSO'),
(49, 2, 188, 1, '2023-03-29 16:18:40', 'DIRECTAMENTE A GERENCIA'),
(50, 4, 181, 55, '2023-03-29 16:20:08', 'ESTE PRIMERO PASO POR AUDITOR ASI QUE NO ME MOSTRO EL ASIGNAR CENTRO DE COSTOS'),
(51, 4, 188, 55, '2023-03-29 16:48:09', 'INTENTO DE ASIGNAR NOMBRE POR STRING AL HANDLESUBMIT PERO PARA BUSQUEDAS DE SUBAREA Y CENTRO DE COSTOS ES POR ID'),
(52, 1, 189, 44, '2023-03-29 16:51:03', 'INICIO DEL PROCESO DEL 189-CALI-2932023T4:50:29PM EXITOSO'),
(53, 2, 189, 44, '2023-03-29 16:51:15', 'MENSAJE 1'),
(54, 1, 190, 44, '2023-03-29 16:52:05', 'INICIO DEL PROCESO DEL 190-MEDELLÍN-2932023T4:51:53PM EXITOSO'),
(55, 2, 190, 44, '2023-03-29 16:52:17', '2342C'),
(56, 1, 191, 44, '2023-03-29 16:52:59', 'INICIO DEL PROCESO DEL 191-MEDELLÍN-2932023T4:52:26PM EXITOSO'),
(57, 2, 191, 44, '2023-03-29 16:53:08', '234'),
(58, 1, 192, 44, '2023-03-29 16:53:29', 'INICIO DEL PROCESO DEL 192-MEDELLÍN-2932023T4:53:17PM EXITOSO'),
(59, 2, 192, 44, '2023-03-29 16:53:37', '234C23D234D234D'),
(60, 3, 190, 43, '2023-03-29 17:00:14', 'CENTRO DE COSTOS DEBE TENER VALOR \'909090\''),
(61, 4, 190, 55, '2023-03-29 17:19:19', 'TEST DE COST CENTER'),
(62, 5, 190, 64, '2023-03-29 17:26:16', 'PROBANDO EL CAMBIO DE COUNT ACOUNTING'),
(63, 6, 190, 65, '2023-03-29 17:28:50', 'ASIGNO FILE CODE TREASURE Y AGREGO UN NUEVO ARCHIVO PDF COMO RESULTADO FINAL'),
(64, 2, 190, 65, '2023-03-29 17:28:52', 'ASIGNO FILE CODE TREASURE Y AGREGO UN NUEVO ARCHIVO PDF COMO RESULTADO FINAL'),
(65, 11, 189, 43, '2023-03-29 22:55:37', 'LO ANULARE Y DEBERIA ENVIARSE A ADMINISTRACION ASIGNE EL USUARIO 1'),
(66, 1, 194, 1, '2023-03-30 15:41:43', 'INICIO DEL PROCESO DEL 123-medayork-12345 EXITOSO'),
(67, 1, 195, 1, '2023-03-30 15:50:46', 'INICIO DEL PROCESO DEL 123-medayork-1234ñ5 EXITOSO'),
(68, 1, 196, 1, '2023-03-30 15:52:53', 'INICIO DEL PROCESO DEL 123-medayork-1238ñ5 EXITOSO'),
(69, 1, 197, 1, '2023-03-30 15:53:15', 'INICIO DEL PROCESO DEL 123-medayork-128ñ5 EXITOSO'),
(70, 1, 198, 1, '2023-03-30 16:08:09', 'INICIO DEL PROCESO DEL 123-medayork-123 EXITOSO'),
(71, 1, 199, 1, '2023-03-30 16:09:47', 'INICIO DEL PROCESO DEL 123-medayork-1234 EXITOSO'),
(72, 1, 200, 1, '2023-03-30 16:16:56', 'INICIO DEL PROCESO DEL 1852-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(73, 1, 201, 1, '2023-03-30 16:22:31', 'INICIO DEL PROCESO DEL 201-CALI -3032023T4:20:24PM EXITOSO'),
(74, 1, 202, 1, '2023-03-30 16:42:09', 'INICIO DEL PROCESO DEL 18521-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(75, 1, 203, 1, '2023-03-30 16:43:08', 'INICIO DEL PROCESO DEL 12-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(76, 1, 204, 1, '2023-03-30 16:45:38', 'INICIO DEL PROCESO DEL 13-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(77, 1, 205, 1, '2023-03-30 16:46:19', 'INICIO DEL PROCESO DEL 14-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(78, 1, 206, 1, '2023-03-30 16:46:42', 'INICIO DEL PROCESO DEL 15-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(79, 1, 207, 1, '2023-03-31 08:15:31', 'INICIO DEL PROCESO DEL 16-MEDELLÍN-2732023T4:46:46PM EXITOSO'),
(80, 9, 191, 43, '2023-03-31 15:02:09', 'FALTA RUT '),
(81, 6, 182, 65, '2023-03-31 15:22:53', 'EWCFWC'),
(82, 2, 182, 65, '2023-03-31 15:23:00', 'EWCFWC'),
(83, 2, 198, 1, '2023-04-03 11:14:15', 'DAVID LE TIEMBLAN LAS NALGUITAS DONDE ESTO NO SUBA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `idroles` int(11) NOT NULL,
  `idsedes` int(11) NOT NULL,
  `users_identification_type` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA') COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_identification` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_identification_digital_check` varchar(1) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_lastname` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_address` varchar(256) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_phone` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_email` varchar(256) COLLATE utf8mb3_spanish_ci NOT NULL,
  `users_providers_paydays` int(11) DEFAULT NULL,
  `users_providers_expiration_date` date DEFAULT NULL,
  `users_status` enum('ACTIVO','INACTIVO') COLLATE utf8mb3_spanish_ci DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `idroles`, `idsedes`, `users_identification_type`, `users_identification`, `users_identification_digital_check`, `users_name`, `users_lastname`, `users_address`, `users_phone`, `users_email`, `users_providers_paydays`, `users_providers_expiration_date`, `users_status`) VALUES
(1, 10, 1, 'CEDULA CIUDADANIA', '1037637170', '4', 'DAVID', 'GIRALDO URREGO', 'CALLE 82 #56-18', '3023186572', 'DAVID.GIRALDO@TECLAB.COM.CO', NULL, NULL, 'ACTIVO'),
(41, 9, 1, 'PASAPORTE', '1026146629', '5', 'SANTIAGO', 'SIERRA CANO', 'CL 128 SUR CR 45-66', '3117137084', 'SANTISCANO@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(42, 1, 2, 'CEDULA CIUDADANIA', '123', '8', 'PROVEEDOR', 'PROVEEDOR', 'PROVEEDOR', '123456', 'PROVEEDOR@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(43, 3, 1, 'CEDULA CIUDADANIA', '23456787654', '6', 'GH', 'GH', 'GH', '4565', 'GH@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(44, 2, 1, 'CEDULA CIUDADANIA', '162348', '2', 'RADICACION', 'RADICACION', 'RADICACION', '98763452', 'RADICACION@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(50, 4, 1, 'CEDULA CIUDADANIA', '87652345645784', '2', 'CONTROL', 'CONTROL', 'CONTROL', '14353673', 'CONTROL@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(54, 5, 2, 'CEDULA CIUDADANIA', '934765123461574', '2', 'RIESGOS', 'RIESGOS', 'RIESGOS', 'riesgos', 'RIESGOS@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(55, 6, 3, 'CEDULA CIUDADANIA', '84635252', '0', 'GERENCIA', 'GERENCIA', 'GERENCIA', '234534657', 'GERENCIA@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(56, 1, 1, 'CEDULA CIUDADANIA', '87434525', '4', 'PROVEEDOR', 'MEDELLIN', 'PROVEEDOR', '2351', 'PROVEEDORMEDELLIN', NULL, NULL, 'ACTIVO'),
(59, 1, 2, 'CEDULA CIUDADANIA', '87653242', '4', 'PROVEEDOR', 'CALI', 'PROVEEDORCALI@GMAIL.COM', '23456787546763', 'PROVEEDORCALI@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(60, 1, 3, 'CEDULA CIUDADANIA', '87652349028', '5', 'PROVEEDOR', 'BOGOTA', 'JEFIUWNCP', '2039482360', 'PROVEEDORBOGOTA@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(61, 1, 4, 'CEDULA CIUDADANIA', '45265431', '2', 'PROVEEDOR', 'BARRANQUILLA', 'FDGHJY456', '2345678978564', 'PROVEEDORBARRANQUILLA@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(62, 1, 5, 'NIT', '876542342', '8', 'PROVEEDOR', 'CALI', 'ASLDKFJHOI', '0934829u', 'PROVEEDORCALI2@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(63, 3, 2, 'CEDULA CIUDADANIA', '098765321', '9', 'GH2', 'GESTION HUMANA 2', 'LASHDJK', '230849280', 'GH2@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(64, 7, 1, 'CEDULA CIUDADANIA', '765432', '1', 'CONTABILIDAD', 'ROL CONTABLE', 'CR CONTABILIDAD # CONTABLE -12', '6523879', 'CONTABILIDAD@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(65, 8, 1, 'CEDULA CIUDADANIA', '7654322342', '5', 'TESORERIA', 'TESORERIA APELLIDO', 'TESORERIA DIRECCION', '435972', 'TESORERIA@GMAIL.COM', NULL, NULL, 'ACTIVO'),
(66, 9, 1, 'CEDULA CIUDADANIA', '1026148899', '6', 'SANTIAGO', 'TEST TECNOLOGIA', '', '3117137084', 'TECNOLOGIA@GMAIL.COM', NULL, NULL, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura para la vista `ShowTable`
--
DROP TABLE IF EXISTS `ShowTable`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u722911909_digitalizacion`@`%` SQL SECURITY DEFINER VIEW `ShowTable`  AS SELECT `F`.`idfiles` AS `idfiles`, `F`.`idproviders` AS `idproviders`, `F`.`idusers` AS `idusers`, `F`.`idfiles_states` AS `idfiles_states`, `F`.`idsedes` AS `idsedes`, `F`.`files_type` AS `files_type`, `F`.`files_registered` AS `files_registered`, `F`.`files_cost_center` AS `files_cost_center`, `F`.`files_code_accounting` AS `files_code_accounting`, `F`.`files_code_treasury` AS `files_code_treasury`, `F`.`files_price` AS `files_price`, `F`.`files_account_type` AS `files_account_type`, `F`.`files_account_type_number` AS `files_account_type_number`, `S`.`sedes_country` AS `sedes_country`, `S`.`sedes_city` AS `sedes_city`, `S`.`sedes_state` AS `sedes_state`, `S`.`sedes_address` AS `sedes_address`, `S`.`sedes_name` AS `sedes_name`, `S`.`sedes_type` AS `sedes_type`, `U`.`idroles` AS `UserAssignedRol`, `U`.`users_identification_type` AS `UserAssignedIdentificationType`, `U`.`users_identification` AS `UserAssignedIdentification`, `U`.`users_identification_digital_check` AS `UserAssignedIdenfiticationDigitalCheck`, `U`.`users_name` AS `UserAssignedName`, `U`.`users_lastname` AS `UserAssignedLastname`, `U`.`users_address` AS `UserAssignedAddress`, `U`.`users_phone` AS `UserAssignedPhone`, `U`.`users_email` AS `UserAssignedEmail`, `U`.`users_providers_paydays` AS `UserAssignedPaydays`, `U`.`users_providers_expiration_date` AS `UserAssignedExpirationDate`, `U`.`users_status` AS `UserAssignedStatus`, `P`.`idroles` AS `idroles`, `P`.`users_identification_type` AS `users_identification_type`, `P`.`users_identification` AS `users_identification`, `P`.`users_identification_digital_check` AS `users_identification_digital_check`, `P`.`users_name` AS `users_name`, `P`.`users_lastname` AS `users_lastname`, `P`.`users_address` AS `users_address`, `P`.`users_phone` AS `users_phone`, `P`.`users_email` AS `users_email`, `P`.`users_providers_paydays` AS `users_providers_paydays`, `P`.`users_providers_expiration_date` AS `users_providers_expiration_date`, `P`.`users_status` AS `users_status`, `FS`.`files_states` AS `files_states`, `FS`.`files_states_description` AS `files_states_description`, `R`.`roles` AS `UserAssignedRoles` FROM (((((`files` `F` join `sedes` `S` on(`F`.`idsedes` = `S`.`idsedes`)) join `users` `P` on(`F`.`idproviders` = `P`.`idusers`)) join `users` `U` on(`F`.`idusers` = `U`.`idusers`)) join `files_states` `FS` on(`F`.`idfiles_states` = `FS`.`idfiles_states`)) join `roles` `R` on(`U`.`idroles` = `R`.`idroles`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cost_center`
--
ALTER TABLE `cost_center`
  ADD PRIMARY KEY (`idcost_center`),
  ADD UNIQUE KEY `cost_center_UNIQUE` (`cost_center`),
  ADD KEY `cost_center_FK_idx` (`idcost_center_subarea`);

--
-- Indices de la tabla `cost_center_area`
--
ALTER TABLE `cost_center_area`
  ADD PRIMARY KEY (`idcost_center_area`),
  ADD UNIQUE KEY `cost_center_area_UNIQUE` (`cost_center_area`);

--
-- Indices de la tabla `cost_center_subarea`
--
ALTER TABLE `cost_center_subarea`
  ADD PRIMARY KEY (`idcost_center_subarea`),
  ADD UNIQUE KEY `cost_center_subarea_UNIQUE` (`cost_center_subarea`),
  ADD KEY `cost_center_subarea_FK_idx` (`idcost_center_area`);

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`idfiles`),
  ADD UNIQUE KEY `files_registered_UNIQUE` (`files_registered`),
  ADD KEY `files_idfiles_states_FK_idx` (`idfiles_states`),
  ADD KEY `files_idproviders_FK_idx` (`idproviders`),
  ADD KEY `files_idusers_FK_idx` (`idusers`),
  ADD KEY `files_idsedes_FK_idx` (`idsedes`);

--
-- Indices de la tabla `files_path`
--
ALTER TABLE `files_path`
  ADD PRIMARY KEY (`idfiles_path`),
  ADD KEY `idfiles_FK_idx` (`idfiles`);

--
-- Indices de la tabla `files_states`
--
ALTER TABLE `files_states`
  ADD PRIMARY KEY (`idfiles_states`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idroles`),
  ADD UNIQUE KEY `idroles_UNIQUE` (`idroles`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`idsedes`);

--
-- Indices de la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`idtracking`),
  ADD KEY `idfiles_states_FK_idx` (`idfiles_states`),
  ADD KEY `idfiles_FK_idx` (`idfiles`),
  ADD KEY `idusers_FK_idx` (`idusers`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`),
  ADD UNIQUE KEY `users_email_UNIQUE` (`users_email`),
  ADD KEY `users_idroles_FK_idx` (`idroles`),
  ADD KEY `users_idsedes_FK_idx` (`idsedes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cost_center`
--
ALTER TABLE `cost_center`
  MODIFY `idcost_center` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cost_center_area`
--
ALTER TABLE `cost_center_area`
  MODIFY `idcost_center_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `cost_center_subarea`
--
ALTER TABLE `cost_center_subarea`
  MODIFY `idcost_center_subarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `files`
--
ALTER TABLE `files`
  MODIFY `idfiles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT de la tabla `files_path`
--
ALTER TABLE `files_path`
  MODIFY `idfiles_path` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `files_states`
--
ALTER TABLE `files_states`
  MODIFY `idfiles_states` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idroles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `idsedes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tracking`
--
ALTER TABLE `tracking`
  MODIFY `idtracking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cost_center`
--
ALTER TABLE `cost_center`
  ADD CONSTRAINT `cost_center_FK` FOREIGN KEY (`idcost_center_subarea`) REFERENCES `cost_center_subarea` (`idcost_center_subarea`);

--
-- Filtros para la tabla `cost_center_subarea`
--
ALTER TABLE `cost_center_subarea`
  ADD CONSTRAINT `cost_center_subarea_FK` FOREIGN KEY (`idcost_center_area`) REFERENCES `cost_center_area` (`idcost_center_area`);

--
-- Filtros para la tabla `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_idfiles_states_FK` FOREIGN KEY (`idfiles_states`) REFERENCES `files_states` (`idfiles_states`),
  ADD CONSTRAINT `files_idproviders_FK` FOREIGN KEY (`idproviders`) REFERENCES `users` (`idusers`),
  ADD CONSTRAINT `files_idsedes_FK` FOREIGN KEY (`idsedes`) REFERENCES `sedes` (`idsedes`),
  ADD CONSTRAINT `files_idusers_FK` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`);

--
-- Filtros para la tabla `files_path`
--
ALTER TABLE `files_path`
  ADD CONSTRAINT `files_path_idfiles_FK` FOREIGN KEY (`idfiles`) REFERENCES `files` (`idfiles`) ON DELETE SET NULL;

--
-- Filtros para la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `idfiles_FK` FOREIGN KEY (`idfiles`) REFERENCES `files` (`idfiles`),
  ADD CONSTRAINT `idfiles_states_FK` FOREIGN KEY (`idfiles_states`) REFERENCES `files_states` (`idfiles_states`),
  ADD CONSTRAINT `idusers_FK` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_idroles_FK` FOREIGN KEY (`idroles`) REFERENCES `roles` (`idroles`),
  ADD CONSTRAINT `users_idsedes_FK` FOREIGN KEY (`idsedes`) REFERENCES `sedes` (`idsedes`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
