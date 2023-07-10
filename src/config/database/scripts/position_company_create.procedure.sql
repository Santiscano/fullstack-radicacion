CREATE PROCEDURE `position_company_create` (
    IN _position_company_name VARCHAR(45),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM position_company WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO position_company
                ( position_company_name )
            VALUES
                ( _position_company_name );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END