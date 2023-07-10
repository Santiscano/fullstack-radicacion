CREATE PROCEDURE `documents_create` (
    IN _iddocuments_type INT(11),
    IN _idhiring INT(11),
    IN _documents_creation_date DATE,
    IN _documents_path VARCHAR(256),
    OUT p_message VARCHAR(255),
    OUT p_insert_id INT
    )
    BEGIN
        -- DECLARE v_counter INT;
        -- SELECT COUNT(*) INTO v_counter FROM documents WHERE parametro????? = _parametro???? ;
    
        -- IF v_counter > 0 THEN
            -- SET p_message = CONCAT('los datos ', _parametro?????,' ya existe en la base de datos');
            -- SET p_insert_id = NULL;
        -- ELSE
            INSERT INTO documents
                ( iddocuments_type, idhiring, documents_creation_date, documents_path )
            VALUES
                ( _iddocuments_type, _idhiring, _documents_creation_date, _documents_path );
            SET p_message = CONCAT('Datos creados con éxito');
            SET p_insert_id = LAST_INSERT_ID();
        -- END IF;
    END