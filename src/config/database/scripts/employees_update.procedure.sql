CREATE PROCEDURE `employees_update` (
    IN _idemployees INT(11),
    IN _employees_name VARCHAR(45),
    IN _employees_lastname VARCHAR(45),
    IN _employees_identification_type ENUM('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA','RUT'),
    IN _employees_identification VARCHAR(16),
    IN _employees_rh VARCHAR(3),
    IN _employees_birthdate_date DATE,
    IN _employees_birthdate_city VARCHAR(45),
    IN _employees_photo_path VARCHAR(256),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM employees WHERE idemployees = _idemployees;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idemployees , ' no existen en la base de datos');
    ELSE
        UPDATE employees
        SET
            employees_name = _employees_name,
            employees_lastname = _employees_lastname,
            employees_identification_type = _employees_identification_type,
            employees_identification = _employees_identification,
            employees_rh = _employees_rh,
            employees_birthdate_date = _employees_birthdate_date,
            employees_birthdate_city = _employees_birthdate_city,
            employees_photo_path = _employees_photo_path
        WHERE idemployees = _idemployees;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END