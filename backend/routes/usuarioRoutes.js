const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/usuarioController'); 

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/', (req, res) => {
  res.send('Rutas de usuario funcionando');
});

module.exports = router;