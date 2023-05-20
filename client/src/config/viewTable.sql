CREATE VIEW `view_showtable` AS
SELECT
	`f`.`idfiles` AS `idfiles`,
	`f`.`idproviders` AS `idproviders`,
	`f`.`idusers` AS `idusers`,
	`f`.`idfiles_states` AS `idfiles_states`,
	`f`.`idsedes` AS `idsedes`,
	`f`.`files_type` AS `files_type`,
	`f`.`files_registered` AS `files_registered`,
	`f`.`files_cost_center` AS `files_cost_center`,
	`f`.`files_code_accounting` AS `files_code_accounting`,
	`f`.`files_code_treasury` AS `files_code_treasury`,
	`f`.`files_price` AS `files_price`,
	`f`.`files_account_type` AS `files_account_type`,
	`f`.`files_account_type_number` AS `files_account_type_number`,
  `s`.`sedes_country` AS `sedes_country`,
	`s`.`sedes_city` AS `sedes_city`,
	`s`.`sedes_state` AS `sedes_state`,
	`s`.`sedes_address` AS `sedes_address`,
	`s`.`sedes_name` AS `sedes_name`,
	`s`.`sedes_type` AS `sedes_type`,
  `u`.`idroles` AS `UserAssignedRol`,
	`u`.`users_identification_type` AS `UserAssignedIdentificationType`,
	`u`.`users_identification` AS `UserAssignedIdentification`,
	`u`.`users_identification_digital_check` AS `UserAssignedIdenfiticationDigitalCheck`,
	`u`.`users_name` AS `UserAssignedName`,
	`u`.`users_lastname` AS `UserAssignedLastname`,
	`u`.`users_address` AS `UserAssignedAddress`,
	`u`.`users_phone` AS `UserAssignedPhone`,
	`u`.`users_email` AS `UserAssignedEmail`,
	`u`.`users_providers_paydays` AS `UserAssignedPaydays`,
	`u`.`users_providers_expiration_date` AS `UserAssignedExpirationDate`,
	`u`.`users_status` AS `UserAssignedStatus`,
  `p`.`idroles` AS `idroles`,
	`p`.`users_identification_type` AS `users_identification_type`,
	`p`.`users_identification` AS `users_identification`,
	`p`.`users_identification_digital_check` AS `users_identification_digital_check`,
	`p`.`users_name` AS `users_name`,
	`p`.`users_lastname` AS `users_lastname`,
	`p`.`users_address` AS `users_address`,
	`p`.`users_phone` AS `users_phone`,
	`p`.`users_email` AS `users_email`,
	`p`.`users_providers_paydays` AS `users_providers_paydays`,
	`p`.`users_providers_expiration_date` AS `users_providers_expiration_date`,
	`p`.`users_status` AS `users_status`,
	`fs`.`files_states` AS `files_states`,
	`fs`.`files_states_description` AS `files_states_description`,
	`r`.`roles` AS `UserAssignedRoles`,
	`t`.`tracking_date` AS `entry_date`,
	`t`.`idfiles_states` AS `tracking_idfiles_states`
FROM
	((((((`files` `f`
	JOIN  `sedes` `s` ON ((`f`.`idsedes` = `s`.`idsedes`)))
  JOIN `users` `p` ON ((`f`.`idproviders` = `p`.`idusers`)))
  JOIN `users` `u` ON ((`f`.`idusers` = `u`.`idusers`)))
  JOIN `files_states` `fs` ON ((`f`.`idfiles_states` = `fs`.`idfiles_states`)))
  JOIN `roles` `r` ON ((`u`.`idroles` = `r`.`idroles`)))
  JOIN `tracking` `t` ON ((`f`.`idfiles` = `t`.`idfiles`)))
WHERE
	(`t`.`idfiles_states` = 1)
