const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() as ahora');
    console.log('Conexión exitosa:', rows[0].ahora);
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
}

testConnection();
