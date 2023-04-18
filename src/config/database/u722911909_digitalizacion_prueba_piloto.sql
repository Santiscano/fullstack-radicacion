-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2023 a las 16:55:27
-- Versión del servidor: 10.6.12-MariaDB-cll-lve
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
  `cost_center` varchar(2) NOT NULL,
  `cost_center_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cost_center_area`
--

CREATE TABLE `cost_center_area` (
  `idcost_center_area` int(11) NOT NULL,
  `cost_center_area` varchar(2) NOT NULL,
  `cost_center_area_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cost_center_subarea`
--

CREATE TABLE `cost_center_subarea` (
  `idcost_center_subarea` int(11) NOT NULL,
  `idcost_center_area` int(11) NOT NULL,
  `cost_center_subarea` varchar(2) NOT NULL,
  `cost_center_subarea_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

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
  `files_type` enum('ADMINISTRATIVO','OPERATIVO') NOT NULL,
  `files_registered` varchar(45) NOT NULL,
  `files_cost_center` varchar(6) DEFAULT NULL,
  `files_code_accounting` varchar(45) DEFAULT NULL,
  `files_code_treasury` varchar(45) DEFAULT NULL,
  `files_price` int(11) NOT NULL DEFAULT 0,
  `files_account_type` enum('CUENTA COBRO','FACTURA PROVEEDOR','MANIFIESTO CARGA') NOT NULL,
  `files_account_type_number` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files_path`
--

CREATE TABLE `files_path` (
  `idfiles_path` int(11) NOT NULL,
  `idfiles` int(11) NOT NULL,
  `files_path` varchar(256) NOT NULL,
  `files_path_date` datetime NOT NULL,
  `files_path_observation` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files_states`
--

CREATE TABLE `files_states` (
  `idfiles_states` int(11) NOT NULL,
  `files_states` varchar(90) NOT NULL,
  `files_states_description` varchar(90) NOT NULL
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
  `roles` varchar(45) NOT NULL,
  `roles_description` varchar(256) NOT NULL
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
(7, 'CONTABILIDAD', 'AUDITOR'),
(8, 'TESORERIA', 'AUDITOR'),
(9, 'TECNOLOGÍA', 'AUDITOR'),
(10, 'ADMINISTRADOR', 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `idsedes` int(11) NOT NULL,
  `sedes_country` varchar(45) NOT NULL,
  `sedes_city` varchar(45) NOT NULL,
  `sedes_state` varchar(45) NOT NULL,
  `sedes_address` varchar(256) NOT NULL,
  `sedes_name` varchar(45) NOT NULL,
  `sedes_type` enum('PROPIA','NACIONAL') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`idsedes`, `sedes_country`, `sedes_city`, `sedes_state`, `sedes_address`, `sedes_name`, `sedes_type`) VALUES
(1, 'COLOMBIA', 'MEDELLÍN', 'ANTIOQUIA', 'CALLE 30A # 65B - 59, BARRIO FATIMA', 'SOLUCIONES ENVIEXPRESS - MEDELLÍN', 'PROPIA'),
(2, 'COLOMBIA', 'CALI', 'VALLE DEL CAUCA', 'CARRERA 37 #10 - 197, BODEGA 10 (YUMBO)', 'SOLUCIONES ENVIEXPRESS - CALI', 'PROPIA'),
(3, 'COLOMBIA', 'BOGOTÁ', 'BOGOTÁ D.C.', 'CARRERA 65 # 17 - 96, BARRIO PUENTE ARANDA', 'SOLUCIONES ENVIEXPRESS - BOGOTÁ', 'PROPIA'),
(4, 'COLOMBIA', 'BARRANQUILLA', 'ATLÁNTICO', 'AV. CIRCUNVALAR # 3 - 367, BODEGA 6 EUROPARK', 'SOLUCIONES ENVIEXPRESS - BARRANQUILLA', 'PROPIA');

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
,`UserAssignedIdentificationType` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA','RUT')
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
,`users_identification_type` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA','RUT')
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
,`entry_date` datetime
,`tracking_idfiles_states` int(11)
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
  `tracking_observation` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `idroles` int(11) NOT NULL,
  `idsedes` int(11) NOT NULL,
  `users_identification_type` enum('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA','RUT') NOT NULL,
  `users_identification` varchar(45) NOT NULL,
  `users_identification_digital_check` varchar(1) NOT NULL,
  `users_name` varchar(45) NOT NULL,
  `users_lastname` varchar(45) NOT NULL,
  `users_address` varchar(256) NOT NULL,
  `users_phone` varchar(45) NOT NULL,
  `users_email` varchar(256) NOT NULL,
  `users_providers_paydays` int(11) DEFAULT NULL,
  `users_providers_expiration_date` date DEFAULT NULL,
  `users_status` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `idroles`, `idsedes`, `users_identification_type`, `users_identification`, `users_identification_digital_check`, `users_name`, `users_lastname`, `users_address`, `users_phone`, `users_email`, `users_providers_paydays`, `users_providers_expiration_date`, `users_status`) VALUES
(1, 10, 1, 'RUT', '9015446478', '4', 'TECLAB', 'DEVELOPER', 'CALLE 30A #65B - 59', '3023186572', 'TECLAB.DEVELOPER@TECLAB.COM.CO', NULL, NULL, 'ACTIVO'),
(2, 10, 1, 'CEDULA CIUDADANIA', '1037637170', '4', 'DAVID', 'GIRALDO', 'CALLE 82  56 -18', '3023186572', 'DAVID.GIRALDO@TECLAB.COM.CO', NULL, NULL, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura para la vista `ShowTable`
--
DROP TABLE IF EXISTS `ShowTable`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u722911909_digitalizacion`@`%` SQL SECURITY DEFINER VIEW `ShowTable`  AS SELECT `F`.`idfiles` AS `idfiles`, `F`.`idproviders` AS `idproviders`, `F`.`idusers` AS `idusers`, `F`.`idfiles_states` AS `idfiles_states`, `F`.`idsedes` AS `idsedes`, `F`.`files_type` AS `files_type`, `F`.`files_registered` AS `files_registered`, `F`.`files_cost_center` AS `files_cost_center`, `F`.`files_code_accounting` AS `files_code_accounting`, `F`.`files_code_treasury` AS `files_code_treasury`, `F`.`files_price` AS `files_price`, `F`.`files_account_type` AS `files_account_type`, `F`.`files_account_type_number` AS `files_account_type_number`, `S`.`sedes_country` AS `sedes_country`, `S`.`sedes_city` AS `sedes_city`, `S`.`sedes_state` AS `sedes_state`, `S`.`sedes_address` AS `sedes_address`, `S`.`sedes_name` AS `sedes_name`, `S`.`sedes_type` AS `sedes_type`, `U`.`idroles` AS `UserAssignedRol`, `U`.`users_identification_type` AS `UserAssignedIdentificationType`, `U`.`users_identification` AS `UserAssignedIdentification`, `U`.`users_identification_digital_check` AS `UserAssignedIdenfiticationDigitalCheck`, `U`.`users_name` AS `UserAssignedName`, `U`.`users_lastname` AS `UserAssignedLastname`, `U`.`users_address` AS `UserAssignedAddress`, `U`.`users_phone` AS `UserAssignedPhone`, `U`.`users_email` AS `UserAssignedEmail`, `U`.`users_providers_paydays` AS `UserAssignedPaydays`, `U`.`users_providers_expiration_date` AS `UserAssignedExpirationDate`, `U`.`users_status` AS `UserAssignedStatus`, `P`.`idroles` AS `idroles`, `P`.`users_identification_type` AS `users_identification_type`, `P`.`users_identification` AS `users_identification`, `P`.`users_identification_digital_check` AS `users_identification_digital_check`, `P`.`users_name` AS `users_name`, `P`.`users_lastname` AS `users_lastname`, `P`.`users_address` AS `users_address`, `P`.`users_phone` AS `users_phone`, `P`.`users_email` AS `users_email`, `P`.`users_providers_paydays` AS `users_providers_paydays`, `P`.`users_providers_expiration_date` AS `users_providers_expiration_date`, `P`.`users_status` AS `users_status`, `FS`.`files_states` AS `files_states`, `FS`.`files_states_description` AS `files_states_description`, `R`.`roles` AS `UserAssignedRoles`, `T`.`tracking_date` AS `entry_date`, `T`.`idfiles_states` AS `tracking_idfiles_states` FROM ((((((`files` `F` join `sedes` `S` on(`F`.`idsedes` = `S`.`idsedes`)) join `users` `P` on(`F`.`idproviders` = `P`.`idusers`)) join `users` `U` on(`F`.`idusers` = `U`.`idusers`)) join `files_states` `FS` on(`F`.`idfiles_states` = `FS`.`idfiles_states`)) join `roles` `R` on(`U`.`idroles` = `R`.`idroles`)) join `tracking` `T` on(`F`.`idfiles` = `T`.`idfiles`)) WHERE `T`.`idfiles_states` = 1 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cost_center`
--
ALTER TABLE `cost_center`
  ADD PRIMARY KEY (`idcost_center`),
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
  MODIFY `idcost_center` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `cost_center_area`
--
ALTER TABLE `cost_center_area`
  MODIFY `idcost_center_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `cost_center_subarea`
--
ALTER TABLE `cost_center_subarea`
  MODIFY `idcost_center_subarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `files`
--
ALTER TABLE `files`
  MODIFY `idfiles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `files_path`
--
ALTER TABLE `files_path`
  MODIFY `idfiles_path` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `idsedes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tracking`
--
ALTER TABLE `tracking`
  MODIFY `idtracking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
