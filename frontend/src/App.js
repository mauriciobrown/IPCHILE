import './App.css';
import React, { useState, useEffect } from 'react'; 
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Importa todos tus componentes de página
import Login from './pages/Login';
import Registro from './pages/Registro';
import CrearEvento from './pages/CrearEvento';
import ListaEventos from './pages/ListaEventos';
import EditarEvento from './pages/EditarEvento';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    alert('Sesión cerrada exitosamente.');
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
    <>
      <nav>
        {}
        {!isLoggedIn ? ( 
          <>
            <Link to="/login">Login</Link>
            <Link to="/registro">Registro</Link>
          </>
        ) : ( 
          <>
            <Link to="/crear-evento">Crear Evento</Link>
            <Link to="/eventos">Ver Mis Eventos</Link>
            <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
          </>
        )}
        {}
      </nav>

      <div className="main-content-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Rutas que requieren autenticación */}
          <Route path="/crear-evento" element={<CrearEvento />} />
          <Route path="/eventos" element={<ListaEventos />} />
          <Route path="/editar-evento/:id" element={<EditarEvento />} />
        </Routes>
      </div>
    </>
  );
}
export default App;