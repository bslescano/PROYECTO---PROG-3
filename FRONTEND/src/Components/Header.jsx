import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HOME, LOGIN, ADMIN } from '../Routers/Router';
import "../CSS/Header.css";

const Header = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario-logeado');
    if (usuario) {
      setUsuarioLogeado(JSON.parse(usuario));
    } else {
      setUsuarioLogeado(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('usuario-logeado');
    setUsuarioLogeado(null);
    navigate(LOGIN);
    alert('Sesión cerrada exitosamente.');
  };

  return (
    <header>
      <div className="container">
        <Link to={HOME} className="header-title-link">
          <img src="/Images/hotel-logo.png" alt="Hotel California Logo" className="header-logo" />
        </Link>

        <nav className="header-nav">
          <div className="header-nav-links">
            <Link to="/home" className="header-link">
              Inicio
            </Link>
          </div>
          <div className="header-user-actions">
            {usuarioLogeado ? (
              <>
                <button className="header-button welcome-button" disabled>
                  Hola, {usuarioLogeado.usuario}
                </button>
                <Link to={ADMIN} className="header-button admin-button">
                  Administración
                </Link>
                <button onClick={handleLogout} className="header-button logout-button">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to={LOGIN} className="header-button login-button">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;