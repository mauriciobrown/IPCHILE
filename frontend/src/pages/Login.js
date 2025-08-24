import React, { useState } from 'react';
import API from '../Api';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState(''); 

  const handleLogin = async () => {
    try {
      
      const res = await API.post('/usuarios/login', { correo, contrasena }); 
      localStorage.setItem('token', res.data.token);
      alert('Login exitoso');
      window.location.href = '/eventos';
    } catch (error) {
      console.error('Error capturado en el frontend (Login):', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input placeholder="Correo" onChange={e => setCorreo(e.target.value)} />
      <input
        type="password"
        placeholder="Contraseña" 
        onChange={e => setContrasena(e.target.value)} 
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;