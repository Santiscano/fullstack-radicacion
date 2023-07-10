CREATE PROCEDURE `documents_type_update` (
    IN _iddocuments_type INT(11),
    IN _documents_type_name VARCHAR(45),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM documents_type WHERE iddocuments_type = _iddocuments_type;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _iddocuments_type , ' no existen en la base de datos');
    ELSE
        UPDATE documents_type
        SET
            documents_type_name = _documents_type_name
        WHERE iddocuments_type = _iddocuments_type;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END