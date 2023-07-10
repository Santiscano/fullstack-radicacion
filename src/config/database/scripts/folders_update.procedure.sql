CREATE PROCEDURE `folders_update` (
    IN _idfolders INT(11),
    IN _folders_name VARCHAR(45),
    IN _folders_description VARCHAR(45),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM folders WHERE idfolders = _idfolders;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idfolders , ' no existen en la base de datos');
    ELSE
        UPDATE folders
        SET
            folders_name = _folders_name,
            folders_description = _folders_description
        WHERE idfolders = _idfolders;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END