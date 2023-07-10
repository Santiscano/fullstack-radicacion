CREATE PROCEDURE `companys_create` (
    IN _companys_name VARCHAR(45),
    IN _companys_address VARCHAR(45),
    IN _companys_phone VARCHAR(16),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM companys WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO companys
                ( companys_name, companys_address, companys_phone )
            VALUES
                ( _companys_name, _companys_address, _companys_phone );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END