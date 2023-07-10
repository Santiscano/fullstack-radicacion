CREATE PROCEDURE `users_folders_create` (
    IN _idusers INT(11),
    IN _idfolders INT(11),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM users_folders WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO users_folders
                ( idusers, idfolders )
            VALUES
                ( _idusers, _idfolders );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END