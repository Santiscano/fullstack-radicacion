CREATE PROCEDURE `folders_documents_type_update` (
    IN _idfolders_documents_type INT(11),
    IN _idfolders INT(11),
    IN _iddocuments_type INT(11),
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE v_counter INT;
    SELECT COUNT(*) INTO v_counter FROM folders_documents_type WHERE idfolders_documents_type = _idfolders_documents_type;

    IF v_counter = 0 THEN
        SET p_message = CONCAT('Los datos con id: ', _idfolders_documents_type , ' no existen en la base de datos');
    ELSE
        UPDATE folders_documents_type
        SET
            idfolders = _idfolders,
            iddocuments_type = _iddocuments_type
        WHERE idfolders_documents_type = _idfolders_documents_type;
        SET p_message = 'Datos actualizados con éxito';
    END IF;
END