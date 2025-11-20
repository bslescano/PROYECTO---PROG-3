import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CLIENTS } from "../Routers/router";
import "../CSS/Login.css";

const API_URL = "http://localhost:3000";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const userNavigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/usuarios/login`, {
        usuario: usuario,
        contraseña: password,
      });

      const usuarioEncontrado = response.data;
      localStorage.setItem('usuario-logeado', JSON.stringify(usuarioEncontrado));
      alert("Inicio de sesión exitoso");
      userNavigate('/');

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert(error.response?.data?.error || "Usuario o contraseña incorrectos");
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