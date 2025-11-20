import { Table, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_HABITACIONES } from "../../Components/Constants/EndPoint.js";

const habitacionVacia = {
  numero: "",
  tipo: "Simple",
  precio_noche: 0,
  estado: "disponible",
};

const HabitacionesTable = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionActual, setHabitacionActual] = useState(habitacionVacia);
  const [modo, setModo] = useState('lista');
  const [errorFormulario, setErrorFormulario] = useState(null);

  const cargarDatos = async () => {
    try {
      const response = await axios.get(URL_HABITACIONES);
      setHabitaciones(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setErrorFormulario("Error al cargar las habitaciones. Intente de nuevo.");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const borrarHabitacion = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta habitación?')) {
      try {
        await axios.delete(`${URL_HABITACIONES}/${id}`);
        cargarDatos();
      } catch (error) {
        console.error(`Error al borrar habitación ${id}:`, error);
        setErrorFormulario(error.response?.data?.details || "Error al eliminar la habitación. Intente de nuevo.");
      }
    }
  };

  const handleEditar = (habitacion) => {
    setHabitacionActual(habitacion);
    setModo('editar');
    setErrorFormulario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitacionActual(prevState => ({
      ...prevState,
      [name]: e.target.type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitacionActual.numero || habitacionActual.precio_noche <= 0) {
      setErrorFormulario('Número y Precio por Noche son obligatorios y el precio debe ser mayor a 0.');
      return;
    }

    setErrorFormulario(null);

    try {
      if (modo === 'editar') {
        console.log("Enviando para editar:", habitacionActual);
        await axios.put(
          `${URL_HABITACIONES}/${habitacionActual.id_habitacion}`,
          habitacionActual,
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        
        await axios.post(URL_HABITACIONES, habitacionActual, { headers: { 'Content-Type': 'application/json' } });
      }
      cargarDatos();
      setModo('lista');
      setHabitacionActual(habitacionVacia);
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrorFormulario(error.response?.data?.details || 'Error al guardar la habitación. Intente de nuevo.');
    }
  };

  const handleCancelar = () => {
    setModo('lista');
    setHabitacionActual(habitacionVacia);
    setErrorFormulario(null);
  };

  const renderFormulario = () => (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-light mb-4">
      <h3>{modo === 'crear' ? 'Registrar Nueva Habitación' : 'Editar Habitación'}</h3>
      <div className="mb-3">
        <label htmlFor="numero" className="form-label">Número de Habitación</label>
        <input
          type="text"
          className="form-control"
          id="numero"
          name="numero"
          value={habitacionActual.numero}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de Habitación</label>
        <select className="form-select" id="tipo" name="tipo" value={habitacionActual.tipo} onChange={handleChange}>
          <option value="Simple">Simple</option>
          <option value="Doble">Doble</option>
          <option value="Suite">Suite</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="precio_noche" className="form-label">Precio por Noche</label>
        <input
          type="number"
          className="form-control"
          id="precio_noche"
          name="precio_noche"
          value={habitacionActual.precio_noche}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado Actual</label>
        <select className="form-select" id="estado" name="estado" value={habitacionActual.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>
      {errorFormulario && (
        <div className="alert alert-danger" role="alert">
          {errorFormulario}
        </div>
      )}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary" >{modo === 'crear' ? 'Guardar Habitación' : 'Guardar Cambios'}</button>
      </div>
    </form>
  );

  return (
    <div>
      <button className="btn btn-success mb-3" onClick={() => setModo('crear')}>Registrar Nueva Habitación</button>

      {modo !== 'lista' && renderFormulario()}

      <hr className="my-4" />

      <h2>Habitaciones Existentes</h2>
      <Table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((hab) => (
            <tr key={hab.id_habitacion}>
              <td>{hab.id_habitacion}</td>
              <td>{hab.numero}</td>
              <td>{hab.tipo}</td>
              <td>${hab.precio_noche}</td>
              <td>{hab.estado}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditar(hab)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => borrarHabitacion(hab.id_habitacion)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HabitacionesTable;
