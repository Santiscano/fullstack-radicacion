CREATE PROCEDURE `position_company_update` (
    IN _idposition_company INT(11),
    IN _position_company_name VARCHAR(45),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM position_company WHERE idposition_company = _idposition_company;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idposition_company , ' no existen en la base de datos');
    ELSE
        UPDATE position_company
        SET
            position_company_name = _position_company_name
        WHERE idposition_company = _idposition_company;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END