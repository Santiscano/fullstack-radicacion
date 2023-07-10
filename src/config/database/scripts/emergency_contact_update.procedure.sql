CREATE PROCEDURE `emergency_contact_update` (
    IN _idemergency_contact INT(11),
    IN _idpersonal_information INT(11),
    IN _emergency_contact_name VARCHAR(45),
    IN _emergency_contact_lastname VARCHAR(45),
    IN _emergency_contact_relationship VARCHAR(45),
    IN _emergency_contact_phone VARCHAR(45),
    IN _emergency_contact_cell_phone VARCHAR(45),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM emergency_contact WHERE idemergency_contact = _idemergency_contact;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idemergency_contact , ' no existen en la base de datos');
    ELSE
        UPDATE emergency_contact
        SET
            idpersonal_information = _idpersonal_information,
            emergency_contact_name = _emergency_contact_name,
            emergency_contact_lastname = _emergency_contact_lastname,
            emergency_contact_relationship = _emergency_contact_relationship,
            emergency_contact_phone = _emergency_contact_phone,
            emergency_contact_cell_phone = _emergency_contact_cell_phone
        WHERE idemergency_contact = _idemergency_contact;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END