import { Table, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_HABITACIONES } from "../../Components/Constants/EndPoint.js";
import HabitacionForm from "../HabitacionForm"; // Importar el componente HabitacionForm

const habitacionVacia = {
  numero: "",
  tipo: "Simple",
  precio_noche: 0,
  estado: "disponible",
  url_imagen: "", // Añadido
  descripcion: "", // Añadido
  capacidad: 1, // Añadido
};

const HabitacionesTable = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionActual, setHabitacionActual] = useState(habitacionVacia);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
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

  const handleOpenForm = (habitacion = habitacionVacia) => {
    setHabitacionActual(habitacion);
    setShowForm(true);
    setErrorFormulario(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setHabitacionActual(habitacionVacia);
    setErrorFormulario(null);
  };

  const handleSaveHabitacion = async (formData) => {
    setErrorFormulario(null);
    console.log("Datos enviados desde el frontend:", formData); // <-- Añadido
    try {
      if (formData.id_habitacion) { // Si tiene id, es una edición
        console.log("Enviando para editar:", formData);
        await axios.put(
          `${URL_HABITACIONES}/${formData.id_habitacion}`,
          formData,
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else { // Si no tiene id, es una creación
        console.log("Enviando para crear:", formData);
        await axios.post(URL_HABITACIONES, formData, { headers: { 'Content-Type': 'application/json' } });
      }
      cargarDatos();
      handleCloseForm();
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrorFormulario(error.response?.data?.details || 'Error al guardar la habitación. Intente de nuevo.');
    }
  };

  return (
    <Container>
      <Button variant="success" className="mb-3" onClick={() => handleOpenForm()}>Registrar Nueva Habitación</Button>

      {errorFormulario && (
        <div className="alert alert-danger" role="alert">
          {errorFormulario}
        </div>
      )}

      <HabitacionForm 
        isOpen={showForm} 
        onClose={handleCloseForm} 
        onSave={handleSaveHabitacion} 
        habitacion={habitacionActual.id_habitacion ? habitacionActual : null} // Pasar null si es creación
      />

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Capacidad</th> {/* Añadido */}
            <th>Precio/Noche</th>
            <th>Estado</th>
            <th>Imagen</th> {/* Añadido */}
            <th>Descripción</th> {/* Añadido */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((hab) => (
            <tr key={hab.id_habitacion}>
              <td>{hab.id_habitacion}</td>
              <td>{hab.numero}</td>
              <td>{hab.tipo}</td>
              <td>{hab.capacidad}</td> {/* Añadido */}
              <td>${hab.precio_noche}</td>
              <td>{hab.estado}</td>
              <td><img src={hab.url_imagen} alt={`Habitación ${hab.numero}`} style={{ width: '100px', height: 'auto' }} /></td> {/* Añadido */}
              <td>{hab.descripcion}</td> {/* Añadido */}
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleOpenForm(hab)} // Abre el formulario con los datos de la habitación
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => borrarHabitacion(hab.id_habitacion)}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HabitacionesTable;
