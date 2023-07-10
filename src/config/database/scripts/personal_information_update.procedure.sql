CREATE PROCEDURE `personal_information_update` (
    IN _idpersonal_information INT(11),
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
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM personal_information WHERE idpersonal_information = _idpersonal_information;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idpersonal_information , ' no existen en la base de datos');
    ELSE
        UPDATE personal_information
        SET
            idhiring = _idhiring,
            personal_information_residence_address = _personal_information_residence_address,
            personal_information_residence_city = _personal_information_residence_city,
            personal_information_phone = _personal_information_phone,
            personal_information_cellphone = _personal_information_cellphone,
            personal_information_email = _personal_information_email,
            personal_information_civil_status = _personal_information_civil_status,
            personal_information_gender = _personal_information_gender,
            personal_information_academic_level = _personal_information_academic_level,
            personal_information_medical_emergency = _personal_information_medical_emergency,
            personal_information_arl_emergency = _personal_information_arl_emergency,
            personal_informationcol = _personal_informationcol
        WHERE idpersonal_information = _idpersonal_information;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END