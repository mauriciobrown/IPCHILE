import React, { useState, useEffect } from 'react'; 
import API from '../Api';
import { useNavigate } from 'react-router-dom'; 

function CrearEvento() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const navigate = useNavigate(); 

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para crear un evento.');
      navigate('/login'); 
    }
  }, [navigate]); 
  

  const handleCrear = async () => {
    try {
      await API.post('/eventos', { nombre, descripcion, fecha, ubicacion });
      alert('Evento creado exitosamente');
      navigate('/eventos'); 
    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Error al crear evento. Asegúrate de estar logueado.');
    }
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <input placeholder="Ubicación" value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
      <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <button onClick={handleCrear}>Crear Evento</button>
    </div>
  );
}

export default CrearEvento;