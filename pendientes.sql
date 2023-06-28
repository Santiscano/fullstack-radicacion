SELECT
    P.users_name AS 'P.users_name',
    P.users_identification_type AS 'P.users_identification_type',
    P.users_identification AS 'P.users_identification',
    S.sedes_name AS 'S.sedes_name',
    F.files_type AS 'F.files_type',
    F.files_registered AS 'F.files_registered',
    F.files_cost_center AS 'F.files_cost_center',
    F.files_price AS 'F.files_price',
    F.files_account_type AS 'F.files_account_type',
    F.files_account_type_number AS 'F.files_account_type_number',
    FS.files_states AS 'FS.files_states',
    UF.users_name AS 'UF.users_name',
    R.roles AS 'R.roles',
    T.tracking_date AS 'T.tracking_date',
    U.users_name AS 'U.users_name',
    U.users_lastname AS 'U.users_lastname'
FROM
    files F
    LEFT JOIN tracking T ON F.idfiles = T.idfiles
    LEFT JOIN sedes S ON F.idsedes = S.idsedes
    LEFT JOIN users U ON U.idusers = T.idusers
    LEFT JOIN users P ON P.idusers = F.idproviders
    LEFT JOIN users UF ON UF.idusers = F.idusers
    LEFT JOIN roles R ON UF.idroles = R.idroles
    LEFT JOIN files_states FS ON FS.idfiles_states = F.idfiles_states
WHERE
    F.files_type = 'OPERATIVO'
    AND F.idfiles_states <> 7
    AND T.idfiles_states = 1;