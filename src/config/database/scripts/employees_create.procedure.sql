CREATE PROCEDURE `employees_create` (
    IN _employees_name VARCHAR(45),
    IN _employees_lastname VARCHAR(45),
    IN _employees_identification_type ENUM('CEDULA CIUDADANIA','NIT','PASAPORTE','CEDULA EXTRANJERIA','RUT'),
    IN _employees_identification VARCHAR(16),
    IN _employees_rh VARCHAR(3),
    IN _employees_birthdate_date DATE,
    IN _employees_birthdate_city VARCHAR(45),
    IN _employees_photo_path VARCHAR(256),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM employees WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO employees
                ( employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path )
            VALUES
                ( _employees_name, _employees_lastname, _employees_identification_type, _employees_identification, _employees_rh, _employees_birthdate_date, _employees_birthdate_city, _employees_photo_path );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END