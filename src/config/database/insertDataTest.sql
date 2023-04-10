--- Insertar valores

INSERT INTO roles(roles, roles_description)
    VALUES  ("GG", "GERENTE GENERAL"),
            ("GH", "Equipo de GESTION HUMANA"),
            ("CT", "Equipo de CONTROL"),
            ("RG", "Equipo de RIESGOS"),
            ("ACH", "Equipo de ARCHIVO");

INSERT INTO sedes(sedes_city, sedes_country, sedes_address, sedes_name)
    VALUES  ("Medellin", "Colombia", "Calle 30A #65B-59", "Enviexpress - Medellin");

INSERT INTO users(idroles, idsedes, users_cc, users_name, users_lastname, users_phone, users_email, users_password)
    VALUES  (2, 1, "42763181", "Luz Mery", "Urrego Gutierrez", "3023186572", "luzmeu211@hotmail.com", "pass123");

INSERT INTO providers(providers_cc_nit, providers_code, providers_business_name, providers_address, providers_phone, providers_email, providers_paydays, providers_expiration_date)
    VALUES  ("1037637170", "DG", "David Giraldo Company", "Calle 82 #56-18", "3023186572", "david.girald0@hotmail.com", 30, "2022-11-11");

INSERT INTO files_states(files_states, files_states_description)
    VALUES  ("Asignado", "Estado inicial del documento, una vez ingresa al sistema"),
            ("Temporal", "Falta informacion y/o aprobación por parte de los la empresa"),
            ("Pendientes", "Documentos que les falta información por parte de los terceros"),
            ("Rechazado", "Documento que no cumple con los criterios de la empresa"),
            ("Finalizado", "Estado final del documento");