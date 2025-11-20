// FRONTEND/src/Components/Admin.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RESERVAS_DASHBOARD, CLIENTS_DASHBOARD, HABITACIONES_DASHBOARD, PAGOS_DASHBOARD, ADMIN, HOME } from '../Routers/Router'; // Asegúrate que la importación coincida con el nombre del archivo (router.js o Router.js)
import '../CSS/Admin.css';

const Admin = () => {
  const location = useLocation(); // Para saber en qué pagina estamos y resaltar el botón
  const [userName, setUserName] = useState('Usuario'); // Estado para guardar el nombre del usuario

  useEffect(() => {
    // Al cargar el componente, intenta obtener el nombre del usuario del localStorage
    const usuarioLogeadoJSON = localStorage.getItem('usuario-logeado');
    if (usuarioLogeadoJSON) {
      try {
        const usuarioLogeado = JSON.parse(usuarioLogeadoJSON);
        // Asumimos que el nombre de usuario está en la propiedad 'usuario'.
        // Si se llama diferente en tu base de datos, cámbialo aquí.
        setUserName(usuarioLogeado.usuario || 'Usuario');
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
      }
    }
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  const menuItems = [
    { to: ADMIN, title: 'Inicio', icon: 'dashboard' }, // Un home para el dashboard
    { to: RESERVAS_DASHBOARD, title: 'Reservas', icon: 'book_online' },
    { to: CLIENTS_DASHBOARD, title: 'Clientes', icon: 'group' },
    { to: HABITACIONES_DASHBOARD, title: 'Habitaciones', icon: 'bed' },
    { to: PAGOS_DASHBOARD, title: 'Pagos', icon: 'payments' },
  ];

  return (
    <div className="dashboard-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {userName}</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to} 
                  className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="link-text">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to={HOME} className="nav-link logout">
             <span className="material-symbols-outlined">logout</span>
             <span>Salir</span>
          </Link>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="main-content">
        {/* Aquí es donde React Router inyectará tus tablas (Clientes, Reservas, etc) */}
        <Outlet />{/* actúa como una ventana: "Aquí renderiza lo que toque según la URL" */}
      </main>
    </div>
  );
}

export default Admin;