const express = require('express');
const router = express.Router();
const { crearEvento, listarEventos, obtenerEventoPorId, actualizarEvento,eliminarEvento } = require('../controllers/eventoController'); // Importa las nuevas funciones
const auth = require('../middlewares/auth');

router.post('/', auth, crearEvento);
router.get('/', auth, listarEventos);
router.get('/:id', auth, obtenerEventoPorId);     
router.put('/:id', auth, actualizarEvento);     
router.delete('/:id', auth, eliminarEvento);   

module.exports = router;
