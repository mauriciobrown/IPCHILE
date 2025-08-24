import React, { useState } from 'react';
import API from '../Api';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState(''); 

  const handleRegistro = async () => {
    try {
    
      await API.post('/usuarios/registrar', { nombre, correo, contrasena }); 
      alert('Registro exitoso');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error capturado en el frontend (Registro):', error); 
      alert('Error al registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
      <input placeholder="Correo" onChange={e => setCorreo(e.target.value)} />
      <input
        type="password"
        placeholder="Contraseña" 
        onChange={e => setContrasena(e.target.value)} 
      />
      <button onClick={handleRegistro}>Registrarse</button>
    </div>
  );
}

export default Registro;