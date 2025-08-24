DELIMITER //
CREATE PROCEDURE registrar_usuario (
    IN p_nombre VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(255)
)
BEGIN
    INSERT INTO usuarios (nombre, correo, contrasena)
    VALUES (p_nombre, p_correo, p_contrasena);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE obtener_usuario_por_correo (
    IN p_correo VARCHAR(100)
)
BEGIN
    SELECT * FROM usuarios WHERE correo = p_correo;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE crear_evento (
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_fecha DATE,
    IN p_ubicacion VARCHAR(255),
    IN p_usuario_id INT
)
BEGIN
    INSERT INTO eventos (nombre, descripcion, fecha, ubicacion, usuario_id)
    VALUES (p_nombre, p_descripcion, p_fecha, p_ubicacion, p_usuario_id);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE editar_evento (
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_fecha DATE,
    IN p_ubicacion VARCHAR(255)
)
BEGIN
    UPDATE eventos
    SET nombre = p_nombre,
        descripcion = p_descripcion,
        fecha = p_fecha,
        ubicacion = p_ubicacion
    WHERE id = p_id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE eliminar_evento (
    IN p_id INT
)
BEGIN
    DELETE FROM eventos WHERE id = p_id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE listar_eventos_por_usuario (
    IN p_usuario_id INT
)
BEGIN
    SELECT * FROM eventos WHERE usuario_id = p_usuario_id;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_evento_por_id(IN p_evento_id INT, IN p_usuario_id INT)
BEGIN
    SELECT id, nombre, descripcion, fecha, ubicacion
    FROM eventos
    WHERE id = p_evento_id AND usuario_id = p_usuario_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE actualizar_evento(
    IN p_evento_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_fecha DATE,
    IN p_ubicacion VARCHAR(255),
    IN p_usuario_id INT
)
BEGIN
    UPDATE eventos
    SET
        nombre = p_nombre,
        descripcion = p_descripcion,
        fecha = p_fecha,
        ubicacion = p_ubicacion
    WHERE
        id = p_evento_id AND usuario_id = p_usuario_id;
    -- Puedes devolver un mensaje de éxito o el número de filas afectadas si lo necesitas
END //

DELIMITER ;




-- Si ya existe, primero podrías querer borrarlo para volver a crearlo
DROP PROCEDURE IF EXISTS obtener_usuario_por_correo;

DELIMITER $$
CREATE PROCEDURE obtener_usuario_por_correo(IN p_correo VARCHAR(255))
BEGIN
    SELECT
        id,
        nombre,
        correo,
        contrasena -- <<<< ¡ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ AQUÍ Y EL NOMBRE DE LA COLUMNA SEA EXACTO!
    FROM
        usuarios
    WHERE
        correo = p_correo;
END$$
DELIMITER ;

