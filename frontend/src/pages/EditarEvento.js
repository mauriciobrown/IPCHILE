import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import API from '../Api';

function EditarEvento() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');

 
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await API.get(`/eventos/${id}`); 
        const evento = res.data;
        setNombre(evento.nombre);
        setDescripcion(evento.descripcion);
  
        setFecha(evento.fecha ? evento.fecha.split('T')[0] : '');
        setUbicacion(evento.ubicacion);
      } catch (error) {
        console.error('Error al cargar los datos del evento:', error);
        alert('Error al cargar el evento. Asegúrate de que existe y es tuyo.');
        navigate('/eventos'); 
      }
    };
    fetchEvento();
  }, [id, navigate]); 

  const handleActualizar = async () => {
    try {
      await API.put(`/eventos/${id}`, { nombre, descripcion, fecha, ubicacion }); 
      alert('Evento actualizado exitosamente');
      navigate('/eventos'); 
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      alert('Error al actualizar evento. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Editar Evento</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Fecha"
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />
      <input
        placeholder="Ubicación"
        value={ubicacion}
        onChange={e => setUbicacion(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />
      <button onClick={handleActualizar}>Actualizar Evento</button>
    </div>
  );
}

export default EditarEvento;