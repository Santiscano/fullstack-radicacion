CREATE PROCEDURE `personal_information_create` (
    IN _idhiring INT(11),
    IN _personal_information_residence_address VARCHAR(45),
    IN _personal_information_residence_city VARCHAR(45),
    IN _personal_information_phone VARCHAR(24),
    IN _personal_information_cellphone VARCHAR(45),
    IN _personal_information_email VARCHAR(256),
    IN _personal_information_civil_status VARCHAR(45),
    IN _personal_information_gender VARCHAR(45),
    IN _personal_information_academic_level VARCHAR(45),
    IN _personal_information_medical_emergency VARCHAR(45),
    IN _personal_information_arl_emergency VARCHAR(45),
    IN _personal_informationcol VARCHAR(45),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM personal_information WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO personal_information
                ( idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency, personal_informationcol )
            VALUES
                ( _idhiring, _personal_information_residence_address, _personal_information_residence_city, _personal_information_phone, _personal_information_cellphone, _personal_information_email, _personal_information_civil_status, _personal_information_gender, _personal_information_academic_level, _personal_information_medical_emergency, _personal_information_arl_emergency, _personal_informationcol );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END