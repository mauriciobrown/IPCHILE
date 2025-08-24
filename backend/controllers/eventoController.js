const db = require('../db');

exports.crearEvento = async (req, res) => {
    const { nombre, descripcion, fecha, ubicacion } = req.body;
    const usuario_id = req.user.id;
    try {
        await db.query('CALL crear_evento(?, ?, ?, ?, ?)', [nombre, descripcion, fecha, ubicacion, usuario_id]);
        res.status(201).send({ mensaje: 'Evento creado' }); 
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).send({ error: 'Error interno del servidor al crear evento' });
    }
};

exports.listarEventos = async (req, res) => {
    const usuario_id = req.user.id;
    try {
        const [rows] = await db.query('CALL listar_eventos_por_usuario(?)', [usuario_id]);
        res.send(rows[0]);
    } catch (error) {
        console.error('Error al listar eventos:', error);
        res.status(500).send({ error: 'Error interno del servidor al listar eventos' });
    }
};


exports.obtenerEventoPorId = async (req, res) => {
    const { id } = req.params; 
    const usuario_id = req.user.id; 
    try {
        const [rows] = await db.query('CALL obtener_evento_por_id(?, ?)', [id, usuario_id]);
        const evento = rows[0][0]; 

        if (!evento) {
            return res.status(404).send({ error: 'Evento no encontrado o no autorizado' });
        }
        res.send(evento);
        
    } catch (error) {
        console.error(`Error al obtener evento con ID ${id}:`, error);
        res.status(500).send({ error: 'Error interno del servidor al obtener el evento' });
    }
};

exports.actualizarEvento = async (req, res) => {
    const { id } = req.params; 
    const { nombre, descripcion, fecha, ubicacion } = req.body; 
    const usuario_id = req.user.id; 

    if (!nombre || !descripcion || !fecha || !ubicacion) {
        return res.status(400).send({ error: 'Todos los campos son requeridos para actualizar el evento.' });
    }

    try {
        const [result] = await db.query(
            'CALL actualizar_evento(?, ?, ?, ?, ?, ?)',
            [id, nombre, descripcion, fecha, ubicacion, usuario_id]
        );

        res.send({ mensaje: 'Evento actualizado exitosamente' });
    } catch (error) {
        console.error(`Error al actualizar evento con ID ${id}:`, error);
        res.status(500).send({ error: 'Error interno del servidor al actualizar el evento' });
    }
};

exports.eliminarEvento = async (req, res) => { 
    const { id } = req.params;
    const userId = req.user.id; 

    console.log('Backend: Intentando eliminar evento con ID:', id);
    console.log('Backend: ID de usuario autenticado (req.user.id):', userId, 'Tipo:', typeof userId);

    try {
       
        const [rows] = await db.query('SELECT usuario_id FROM eventos WHERE id = ?', [id]);
        console.log('Backend: Resultado de la consulta para usuario_id (evento encontrado?):', rows);

        if (rows.length === 0) {
            console.log(`Backend: Evento con ID ${id} no encontrado.`);
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }

        const eventoUsuarioId = rows[0].usuario_id;
        const parsedUserId = parseInt(userId, 10); 

        if (eventoUsuarioId !== parsedUserId) {
            console.log(`Backend: usuario_id de DB (${eventoUsuarioId}) no coincide con userId (${parsedUserId}). Acceso denegado.`);
            return res.status(403).json({ message: 'No tienes permiso para eliminar este evento.' });
        }

        console.log('Backend: Llamando al procedimiento almacenado eliminar_evento con ID:', id);
        const [result] = await db.query('CALL eliminar_evento(?)', [id]);
        console.log('Backend: Resultado crudo del procedimiento almacenado eliminar_evento:', result);
        res.status(200).json({ message: 'Evento eliminado exitosamente.' });

    } catch (error) {
 
        console.error('Backend: Error en eliminarEvento:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el evento.' });
    }
};