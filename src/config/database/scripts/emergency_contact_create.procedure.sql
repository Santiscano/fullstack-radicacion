CREATE PROCEDURE `emergency_contact_create` (
    IN _idpersonal_information INT(11),
    IN _emergency_contact_name VARCHAR(45),
    IN _emergency_contact_lastname VARCHAR(45),
    IN _emergency_contact_relationship VARCHAR(45),
    IN _emergency_contact_phone VARCHAR(45),
    IN _emergency_contact_cell_phone VARCHAR(45),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM emergency_contact WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO emergency_contact
                ( idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone )
            VALUES
                ( _idpersonal_information, _emergency_contact_name, _emergency_contact_lastname, _emergency_contact_relationship, _emergency_contact_phone, _emergency_contact_cell_phone );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END