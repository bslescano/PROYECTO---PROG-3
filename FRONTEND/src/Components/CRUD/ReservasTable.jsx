import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_RESERVAS, URL_HABITACIONES, URL_CLIENTES } from '../../Components/Constants/EndPoint.js';

const formVacio = {
  nombre: "",
  apellido: "",
  dni: "",
  pasaporte: "",
  email: "",
  telefono: "",
  id_direccion: null,
  fecha_entrada: '',
  fecha_salida: '',
  adultos: 1,
  ninos: 0,
  id_habitacion: '',
  estado: 'Impaga'
};

const ReservasTable = () => {
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState(formVacio);
  const [errorFormulario, setErrorFormulario] = useState(null);
  const [precioHabitacion, setPrecioHabitacion] = useState(null);
  const [modo, setModo] = useState('lista'); // Añadido modo para edición/creación
  const navigate = useNavigate();

  const cargarDatos = async () => {
    try {
      const response = await axios.get(URL_RESERVAS);
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const borrarReserva = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
      try {
        await axios.delete(`${URL_RESERVAS}/${id}`);
        cargarDatos();
      } catch (error) {
        console.error(`Error al borrar reserva ${id}:`, error);
      }
    }
  };

  const handleEditar = (reserva) => {
    setFormData(reserva);
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

  const buscarHabitacionDisponible = async () => {
    setErrorFormulario(null);
    const { adultos, ninos, fecha_entrada, fecha_salida } = formData;
    const capacidad = adultos + ninos;

    if (capacidad <= 0 || !fecha_entrada || !fecha_salida) {
      setErrorFormulario("Por favor, ingrese fechas y número de huéspedes.");
      return;
    }

    try {
      const response = await axios.get(URL_HABITACIONES, {
        params: { capacidad, fecha_entrada, fecha_salida }
      });

      if (response.data.length > 0) {
        const habitacionAsignada = response.data[0];
        setFormData(prev => ({ ...prev, id_habitacion: habitacionAsignada.id_habitacion })); // Usar id_habitacion
        setPrecioHabitacion(habitacionAsignada.precio_noche); // Usar precio_noche
        alert(`Habitación #${habitacionAsignada.numero} asignada.`);
      } else {
        setErrorFormulario("No hay habitaciones disponibles para esa capacidad y fechas.");
        setPrecioHabitacion(null);
        setFormData(prev => ({ ...prev, id_habitacion: '' }));
      }
    } catch (error) {
      console.error("Error al buscar habitación:", error);
      setErrorFormulario("Error al conectar con el servidor para buscar habitaciones.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_habitacion || !formData.nombre || !formData.dni) {
      setErrorFormulario('Todos los campos son obligatorios.');
      return;
    }

    setErrorFormulario(null);

    try {
      let id_cliente;
      const clienteExistente = await axios.get(`${URL_CLIENTES}?dni=${formData.dni}`);
      if (clienteExistente.data.length > 0) {
        id_cliente = clienteExistente.data[0].id_cliente;
      } else {
        const clienteResponse = await axios.post(URL_CLIENTES, {
          nombre: formData.nombre,
          apellido: formData.apellido,
          dni: formData.dni,
          pasaporte: formData.pasaporte || null, // Asegurarse de enviar null si está vacío
          email: formData.email,
          telefono: formData.telefono,
          id_direccion: formData.id_direccion || null, // Asegurarse de enviar null si está vacío
        });
        id_cliente = clienteResponse.data.id;
      }

      const reservaData = {
        fecha_entrada: formData.fecha_entrada,
        fecha_salida: formData.fecha_salida,
        id_habitacion: formData.id_habitacion,
        id_cliente: id_cliente,
        estado: formData.estado,
      };

      if (modo === 'editar') {
        await axios.put(`${URL_RESERVAS}/${formData.id_reserva}`, reservaData, { headers: { 'Content-Type': 'application/json' } });
      } else {
        await axios.post(URL_RESERVAS, reservaData, { headers: { 'Content-Type': 'application/json' } });
      }
      
      const fechaEntrada = new Date(formData.fecha_entrada);
      const fechaSalida = new Date(formData.fecha_salida);
      const diffTiempo = fechaSalida.getTime() - fechaEntrada.getTime();
      const noches = Math.ceil(diffTiempo / (1000 * 3600 * 24));

      if (noches <= 0 || !precioHabitacion || typeof precioHabitacion !== 'number') {
        setErrorFormulario("Error al calcular el total. Verifique las fechas y el ID de la habitación.");
        return;
      }

      const totalAPagar = noches * precioHabitacion;

      cargarDatos();
      setModo('lista');
      setFormData(formVacio);
      setPrecioHabitacion(null);

    } catch (error) {
      console.error('Error al guardar:', error);
      setErrorFormulario(error.response?.data?.details || 'Error al guardar la reserva. Intente de nuevo.');
    }
  };

  const handleCancelar = () => {
    setModo('lista');
    setFormData(formVacio);
    setPrecioHabitacion(null);
    setErrorFormulario(null);
  };

  const renderFormulario = () => (
    <form onSubmit={handleSubmit} className="reserva-form border p-4 rounded bg-light mb-4">
      {/* Título modificado: solo muestra "Editar Reserva" */}
      <h3>{modo === 'editar' ? 'Editar Reserva' : ''}</h3> 
      <h4>Datos del Cliente</h4>
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

      <hr />

      <h4>Detalles de la Reserva</h4>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="fecha_entrada" className="form-label">Fecha de Entrada</label><input type="date" className="form-control" id="fecha_entrada" name="fecha_entrada" value={formData.fecha_entrada} onChange={handleChange} required /></div>
        <div className="col-md-6 mb-3"><label htmlFor="fecha_salida" className="form-label">Fecha de Salida</label><input type="date" className="form-control" id="fecha_salida" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} required /></div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="adultos" className="form-label">Adultos</label><input type="number" className="form-control" id="adultos" name="adultos" value={formData.adultos} onChange={handleChange} min={1} /></div>
        <div className="col-md-6 mb-3"><label htmlFor="ninos" className="form-label">Niños</label><input type="number" className="form-control" id="ninos" name="ninos" value={formData.ninos} onChange={handleChange} min={0} /></div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
        <button type="button" className="btn btn-info" onClick={buscarHabitacionDisponible}>Buscar y Asignar Habitación</button>
      </div>

      <div className="mb-3">
        <label htmlFor="id_habitacion" className="form-label">Habitación Asignada (ID)</label>
        <input type="text" className="form-control" id="id_habitacion" name="id_habitacion" value={formData.id_habitacion} readOnly placeholder="Se asignará automáticamente" />
        {precioHabitacion && (
          <div className="form-text">
            Precio por noche: ${precioHabitacion}
          </div>
        )}
      </div>

      {errorFormulario && (
        <div className="alert alert-danger" role="alert">
          {errorFormulario}
        </div>
      )}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary me-3" onClick={handleCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary" >{modo === 'crear' ? 'Guardar Reserva' : 'Guardar Cambios'}</button>
      </div>
    </form>
  );

  return (
    <div>
          
      {/* ELIMINADO: renderFormulario en la parte superior. */}

      <hr className="my-4" />

      <h2>Reservas Existentes</h2>
      
      {/* Contenedor de la tabla para redondeo y centrado */}
      <div className="reserva-table-container">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>ID Habitación</th>
              <th>ID Cliente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td>{reserva.id_reserva}</td>
                <td>{new Date(reserva.fecha_entrada).toLocaleDateString()}</td>
                <td>{new Date(reserva.fecha_salida).toLocaleDateString()}</td>
                <td>{reserva.id_habitacion}</td>
                <td>{reserva.id_cliente}</td>
                <td>{reserva.estado}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditar(reserva)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => borrarReserva(reserva.id_reserva)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* BLOQUE DE ACCIÓN INFERIOR: Botón SIEMPRE visible, Formulario CONDICIONAL (ambos abajo) */}

      {/* 1. Botón (Siempre visible, centrado y simétrico) */}
      <div className="centered-button-container">
        <button 
            className="btn btn-success" 
            onClick={() => setModo('crear')}
        >
            Registrar Nueva Reserva
        </button>
      </div>
      
      {/* 2. Formulario (Solo se renderiza al hacer click o editar) */}
      {modo !== 'lista' && renderFormulario()}
    </div>
  );
};

export default ReservasTable;