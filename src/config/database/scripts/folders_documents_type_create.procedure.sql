CREATE PROCEDURE `folders_documents_type_create` (
    IN _idfolders INT(11),
    IN _iddocuments_type INT(11),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM folders_documents_type WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO folders_documents_type
                ( idfolders, iddocuments_type )
            VALUES
                ( _idfolders, _iddocuments_type );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END