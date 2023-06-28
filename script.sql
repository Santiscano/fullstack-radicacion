SELECT
    P.users_identification_type AS 'P.users_identification_type',
    P.users_identification AS 'P.users_identification',
    P.users_name AS 'P.users_name',
    F.idproviders AS 'F.idproviders',
    F.idusers AS 'F.idusers',
    F.idfiles_states AS 'F.idfiles_states',
    F.idsedes AS 'F.idsedes',
    F.files_type AS 'F.files_type',
    F.files_registered AS 'F.files_registered',
    F.files_cost_center AS 'F.files_cost_center',
    F.files_price AS 'F.files_price',
    F.files_account_type AS 'F.files_account_type',
    F.files_account_type_number AS 'F.files_account_type_number',
    T.idfiles_states AS 'T.idfiles_states',
    T.idusers AS 'T.idusers',
    T.tracking_date AS 'T.tracking_date',
    T.tracking_observation AS 'T.tracking_observation',
    FS.idfiles_states AS 'FS.idfiles_states',
    FS.files_states AS 'FS.files_states_name',
    U.users_name AS 'U.users_name',
    U.users_lastname AS 'U.users_lastname'
FROM
    files F
    LEFT JOIN tracking T ON F.idfiles = T.idfiles
    LEFT JOIN files_states FS ON FS.idfiles_states = T.idfiles_states
    LEFT JOIN users U ON U.idusers = T.idusers
    LEFT JOIN users P ON P.idusers = F.idproviders
WHERE
    F.files_type = 'OPERATIVO'
    AND T.idfiles_states = 1;