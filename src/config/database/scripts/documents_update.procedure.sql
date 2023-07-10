CREATE PROCEDURE `documents_update` (
    IN _iddocuments INT(11),
    IN _iddocuments_type INT(11),
    IN _idhiring INT(11),
    IN _documents_creation_date DATE,
    IN _documents_path VARCHAR(256),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM documents WHERE iddocuments = _iddocuments;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _iddocuments , ' no existen en la base de datos');
    ELSE
        UPDATE documents
        SET
            iddocuments_type = _iddocuments_type,
            idhiring = _idhiring,
            documents_creation_date = _documents_creation_date,
            documents_path = _documents_path
        WHERE iddocuments = _iddocuments;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END