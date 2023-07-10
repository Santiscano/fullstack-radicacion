CREATE PROCEDURE `folders_create` (
    IN _folders_name VARCHAR(45),
    IN _folders_description VARCHAR(45),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM folders WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO folders
                ( folders_name, folders_description )
            VALUES
                ( _folders_name, _folders_description );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END