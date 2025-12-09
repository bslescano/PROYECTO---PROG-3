import { Table, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_CLIENTES } from "../../Components/Constants/EndPoint.js";
import { Link, useNavigate } from "react-router-dom";

const formVacio = {
  nombre: "",
  apellido: "",
  dni: "",
  pasaporte: "",
  email: "",
  telefono: "",
  id_direccion: null,
};

const ClientsTable = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState(formVacio);
  const [errorFormulario, setErrorFormulario] = useState(null);
  const [modo, setModo] = useState('lista'); 
  const navigate = useNavigate();

  const cargarDatos = async () => {
    try {
      const response = await axios.get(URL_CLIENTES);
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const borrarCliente = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await axios.delete(`${URL_CLIENTES}/${id}`);
        cargarDatos();
      } catch (error) {
        console.error(`Error al borrar cliente ${id}:`, error);
        setErrorFormulario(error.response?.data?.details || "Error al eliminar el cliente. Intente de nuevo.");
      }
    }
  };

  const handleEditar = (cliente) => {
    setFormData(cliente);
    setModo('editar');
    setErrorFormulario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: e.target.type === "number" ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.dni) {
      setErrorFormulario('Nombre, apellido y DNI son obligatorios.');
      return;
    }

    setErrorFormulario(null);

    try {
      const clienteData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        pasaporte: formData.pasaporte || null,
        email: formData.email,
        telefono: formData.telefono,
        id_direccion: formData.id_direccion || null,
      };

      if (modo === 'editar') {
        await axios.put(`${URL_CLIENTES}/${formData.id_cliente}`, clienteData, { headers: { 'Content-Type': 'application/json' } });
      } else {
        await axios.post(URL_CLIENTES, clienteData, { headers: { 'Content-Type': 'application/json' } });
      }
      
      cargarDatos();
      setModo('lista');
      setFormData(formVacio);

    } catch (error) {
      console.error('Error al guardar cliente:', error);
      setErrorFormulario(error.response?.data?.details || 'Error al guardar el cliente. Intente de nuevo.');
    }
  };

  const handleCancelar = () => {
    setModo('lista');
    setFormData(formVacio);
    setErrorFormulario(null);
  };

  const renderFormulario = () => (
    <form onSubmit={handleSubmit} className="reserva-form border p-4 rounded bg-light mb-4">
      {/* Título modificado: solo muestra "Editar Cliente" */}
      <h3>{modo === 'editar' ? 'Editar Cliente' : ''}</h3>
      <h4>Datos Personales</h4>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="nombre" className="form-label">Nombre</label><input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required /></div>
        <div className="col-md-6 mb-3"><label htmlFor="apellido" className="form-label">Apellido</label><input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required /></div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="dni" className="form-label">DNI</label><input type="text" className="form-control" id="dni" name="dni" value={formData.dni} onChange={handleChange} required /></div>
        <div className="col-md-6 mb-3"><label htmlFor="pasaporte" className="form-label">Pasaporte</label><input type="text" className="form-control" id="pasaporte" name="pasaporte" value={formData.pasaporte} onChange={handleChange} /></div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="email" className="form-label">Email</label><input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3"><label htmlFor="telefono" className="form-label">Teléfono</label><input type="text" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} /></div>
      </div>
      <div className="mb-3"><label htmlFor="id_direccion" className="form-label">ID Dirección (opcional)</label><input type="number" className="form-control" id="id_direccion" name="id_direccion" value={formData.id_direccion || ''} onChange={handleChange} /></div>

      {errorFormulario && (
        <div className="alert alert-danger" role="alert">
          {errorFormulario}
        </div>
      )}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary me-3" onClick={handleCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary" >{modo === 'crear' ? 'Guardar Cliente' : 'Guardar Cambios'}</button>
      </div>
    </form>
  );

  return (
    <div>
 
      
      {/* ELIMINADO: renderFormulario en la parte superior. */}
          <div className="spacer"></div>

      <h2>Clientes Existentes</h2>
      
      {/* Contenedor de la tabla */}
      <div className="reserva-table-container"> 
        <Table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Pasaporte</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>ID Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.dni}</td>
                <td>{cliente.pasaporte}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.id_direccion}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2 boton-accion"
                      onClick={() => handleEditar(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2 boton-accion"
                      onClick={() => borrarCliente(cliente.id_cliente)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {/* BLOQUE DE ACCIÓN INFERIOR: Botón SIEMPRE visible, Formulario CONDICIONAL (ambos abajo) */}
      
      {/* 1. Botón (Siempre visible, centrado y simétrico) */}
      <div className="centered-button-container">
        <button 
            className="btn btn-success" // Clase btn-success para el color morado/azul claro
            onClick={() => setModo('crear')}
        >
            Registrar Nuevo Cliente
        </button>
      </div>
      
      {/* 2. Formulario (Solo se renderiza al hacer click o editar) */}
      {modo !== 'lista' && renderFormulario()}
    </div>
  );
};

export default ClientsTable;