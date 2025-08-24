const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express(); 
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Importa tus archivos de rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const eventoRoutes = require('./routes/eventoRoutes'); 

// Usa tus rutas, con el prefijo '/api'
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/eventos', eventoRoutes); 

// Ruta de prueba básica 
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando');
});

// Exporta la instancia de la aplicación Express
module.exports = app;