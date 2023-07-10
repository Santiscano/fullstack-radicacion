CREATE PROCEDURE `users_folders_update` (
    IN _idusers_folders INT(11),
    IN _idusers INT(11),
    IN _idfolders INT(11),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM users_folders WHERE idusers_folders = _idusers_folders;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idusers_folders , ' no existen en la base de datos');
    ELSE
        UPDATE users_folders
        SET
            idusers = _idusers,
            idfolders = _idfolders
        WHERE idusers_folders = _idusers_folders;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END