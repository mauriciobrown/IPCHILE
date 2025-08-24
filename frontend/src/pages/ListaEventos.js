import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function ListaEventos() {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventos = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No hay token de autenticación. Redirigiendo a login.');
                setEventos([]);
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/api/eventos', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEventos(response.data);
            } catch (error) {
                console.error('Error al cargar eventos:', error.response?.data || error.message);
                if (error.response && error.response.status === 401) {
                    alert('Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    alert('Error al cargar eventos: ' + (error.response?.data?.error || 'Hubo un problema.'));
                }
            }
        };

        fetchEventos();
    }, [navigate]);

    const handleEdit = (id) => {
        navigate(`/editar-evento/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No estás logueado.');
            navigate('/login');
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/api/eventos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
       
            setEventos(eventos.filter(evento => evento.id !== id));
            alert('Evento eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar evento:', error.response?.data || error.message);
            if (error.response && error.response.status === 401) {
                alert('Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                alert('Error al eliminar evento: ' + (error.response?.data?.error || 'Hubo un error al eliminar el evento.'));
            }
        }
    };

    return (
        <div className="lista-eventos-container">
            <h2>Mis Eventos</h2>

            {/* Botón para crear un nuevo evento */}
            <div className="crear-evento-link-container">
                <Link to="/crear-evento" className="btn-primary">Crear Nuevo Evento</Link>
            </div>
            
            {eventos.length === 0 ? (
                <p className="no-eventos-mensaje">No tienes eventos creados.</p>
            ) : (
                <ul className="eventos-lista">
                    {eventos.map(evento => (
                        <li key={evento.id} className="evento-card">
                            
                            <h3>Evento: {evento.nombre}</h3>
                            <p className="descripcion">Descripción: {evento.descripcion}</p>
                            <p className="fecha">Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
                            <p className="ubicacion">Ubicación: {evento.ubicacion}</p>
                            <div className="evento-acciones">
                                
                                <button onClick={() => handleEdit(evento.id)} className="btn-secondary">Editar</button>
                                <button onClick={() => handleDelete(evento.id)} className="btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaEventos;