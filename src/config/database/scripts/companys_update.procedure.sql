CREATE PROCEDURE `companys_update` (
    IN _idcompanys INT(11),
    IN _companys_name VARCHAR(45),
    IN _companys_address VARCHAR(45),
    IN _companys_phone VARCHAR(16),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM companys WHERE idcompanys = _idcompanys;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idcompanys , ' no existen en la base de datos');
    ELSE
        UPDATE companys
        SET
            companys_name = _companys_name,
            companys_address = _companys_address,
            companys_phone = _companys_phone,
        WHERE idcompanys = _idcompanys;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END