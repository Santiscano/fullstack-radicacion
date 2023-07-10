CREATE PROCEDURE `hiring_update` (
    IN _idhiring INT(11),
    IN _idemployees INT(11),
    IN _idposition_company INT(11),
    IN _idcompanys INT(11),
    IN _hiring_entry_date DATE,
    IN _hiring_departure_date DATE,
    IN _hiring_salary INT(11),
    IN _hiring_cost_center VARCHAR(6),
    IN _hiring_eps VARCHAR(45),
    IN _hiring_pension VARCHAR(45),
    IN _hiring_family_compensation_fund VARCHAR(45),
    IN _hiring_layoffs VARCHAR(45),
    IN _hiring_arl VARCHAR(45),
    IN _hiring_shirt_size VARCHAR(8),
    IN _hiring_pant_size VARCHAR(8),
    IN _hiring_shoe_size VARCHAR(8),
    IN _hiring_status ENUM('ACTIVO','INACTIVO'),
    IN _hiring_revision TINYINT(4),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM hiring WHERE idhiring = _idhiring;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idhiring , ' no existen en la base de datos');
    ELSE
        UPDATE hiring
        SET
            idemployees = _idemployees,
            idposition_company = _idposition_company,
            idcompanys = _idcompanys,
            hiring_entry_date = _hiring_entry_date,
            hiring_departure_date = _hiring_departure_date,
            hiring_salary = _hiring_salary,
            hiring_cost_center = _hiring_cost_center,
            hiring_eps = _hiring_eps,
            hiring_pension = _hiring_pension,
            hiring_family_compensation_fund = _hiring_family_compensation_fund,
            hiring_layoffs = _hiring_layoffs,
            hiring_arl = _hiring_arl,
            hiring_shirt_size = _hiring_shirt_size,
            hiring_pant_size = _hiring_pant_size,
            hiring_shoe_size = _hiring_shoe_size,
            hiring_status = _hiring_status,
            hiring_revision = _hiring_revision
        WHERE idhiring = _idhiring;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END