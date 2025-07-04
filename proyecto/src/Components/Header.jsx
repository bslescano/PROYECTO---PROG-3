import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {LOGIN} from "../Routers/Router"

function Header() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datosUsuario = localStorage.getItem('usuario-encontrado');
    if (datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario-encontrado');
    navigate(LOGIN);
  };

  return (
    <header className="header">
      <div className="logo">HOTEL CALIFORNIA</div>
      <nav>
        {usuario ? (
          <>
            <span className="usuario">Hola, {usuario.username}</span>
            <button onClick={cerrarSesion} className="cerrar-sesion">
              Cerrar sesión
            </button>
          </>
        ) : (
          <span>No has iniciado sesión</span>
        )}
      </nav>
    </header>
  );
}

export default Header;
