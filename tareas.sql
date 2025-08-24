CREATE VIEW vista_eventos_con_usuario AS
SELECT 
    e.id AS id_evento,
    e.nombre AS nombre_evento,
    e.descripcion,
    e.fecha,
    e.ubicacion,
    u.nombre AS nombre_usuario
FROM eventos e
JOIN usuarios u ON e.usuario_id = u.id;

