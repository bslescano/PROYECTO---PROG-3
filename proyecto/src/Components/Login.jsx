import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HOME } from "../Routers/Router";
import "../CSS/Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [datos, setDatos] = useState([]);

  const userNavigate = useNavigate();

  const getUsuarios = async () => {
    try {
      const response = await axios.get(URL_USUARIOS);
      setDatos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const usuarioEncontrado = datos.find(
      (user) => user.username === usuario && user.password === password
    );
    if (usuarioEncontrado) {
      localStorage.setItem('usuario-encontrado', JSON.stringify(usuarioEncontrado));
      alert("Inicio de sesión exitoso");
      userNavigate(HOME);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>HOTEL CALIFORNIA</h1>
      </div>
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <h2>Iniciar sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;