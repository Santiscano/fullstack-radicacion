CREATE PROCEDURE `hiring_create` (
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
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM hiring WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO hiring
                ( idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision )
            VALUES
                ( _idemployees, _idposition_company, _idcompanys, _hiring_entry_date, _hiring_departure_date, _hiring_salary, _hiring_cost_center, _hiring_eps, _hiring_pension, _hiring_family_compensation_fund, _hiring_layoffs, _hiring_arl, _hiring_shirt_size, _hiring_pant_size, _hiring_shoe_size, _hiring_status, _hiring_revision );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END