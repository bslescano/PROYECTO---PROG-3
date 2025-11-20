import { Table, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_PAGOS, URL_RESERVAS } from "../../Components/Constants/EndPoint.js";

const formVacio = {
  id_reserva: "",
  monto: 0,
  fecha_pago: "",
  metodo_pago: "Efectivo",
  estado: "Pendiente",
};

const PagosTable = () => {
  const [pagos, setPagos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState(formVacio);
  const [errorFormulario, setErrorFormulario] = useState(null);
  const [modo, setModo] = useState('lista');

  const cargarDatos = async () => {
    try {
      const [pagosResponse, reservasResponse] = await Promise.all([
        axios.get(URL_PAGOS),
        axios.get(URL_RESERVAS)
      ]);
      setPagos(pagosResponse.data);
      setReservas(reservasResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setErrorFormulario("Error al cargar los datos de pagos o reservas.");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const borrarPago = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      try {
        await axios.delete(`${URL_PAGOS}/${id}`);
        cargarDatos();
      } catch (error) {
        console.error(`Error al borrar pago ${id}:`, error);
        setErrorFormulario(error.response?.data?.details || "Error al eliminar el pago. Intente de nuevo.");
      }
    }
  };

  const handleEditar = (pago) => {
    setFormData(pago);
    setModo('editar');
    setErrorFormulario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: e.target.type === "number" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_reserva || formData.monto <= 0 || !formData.fecha_pago) {
      setErrorFormulario('ID de Reserva, Monto y Fecha de Pago son obligatorios y el monto debe ser mayor a 0.');
      return;
    }

    setErrorFormulario(null);

    try {
      const pagoData = {
        id_reserva: parseInt(formData.id_reserva),
        monto: formData.monto,
        fecha_pago: formData.fecha_pago,
        metodo_pago: formData.metodo_pago,
        estado: formData.estado,
      };

      if (modo === 'editar') {
        await axios.put(`${URL_PAGOS}/${formData.id_pago}`, pagoData, { headers: { 'Content-Type': 'application/json' } });
      } else {
        await axios.post(URL_PAGOS, pagoData, { headers: { 'Content-Type': 'application/json' } });
      }
      
      cargarDatos();
      setModo('lista');
      setFormData(formVacio);

    } catch (error) {
      console.error('Error al guardar pago:', error);
      setErrorFormulario(error.response?.data?.details || 'Error al guardar el pago. Intente de nuevo.');
    }
  };

  const handleCancelar = () => {
    setModo('lista');
    setFormData(formVacio);
    setErrorFormulario(null);
  };

  const renderFormulario = () => (
    <form onSubmit={handleSubmit} className="reserva-form border p-4 rounded bg-light mb-4">
      {/* Título modificado: solo muestra "Editar Pago" */}
      <h3>{modo === 'editar' ? 'Editar Pago' : ''}</h3>
      <h4>Detalles del Pago</h4>
      <div className="mb-3">
        <label htmlFor="id_reserva" className="form-label">ID de Reserva</label>
        <select 
          className="form-control"
          id="id_reserva"
          name="id_reserva"
          value={formData.id_reserva}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una reserva</option>
          {reservas.map(reserva => (
            <option key={reserva.id_reserva} value={reserva.id_reserva}>
              Reserva ID: {reserva.id_reserva} (Cliente: {reserva.id_cliente}, Hab: {reserva.id_habitacion})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="monto" className="form-label">Monto</label>
        <input type="number" className="form-control" id="monto" name="monto" value={formData.monto} onChange={handleChange} min="0.01" step="0.01" required />
      </div>
      <div className="mb-3">
        <label htmlFor="fecha_pago" className="form-label">Fecha de Pago</label>
        <input type="date" className="form-control" id="fecha_pago" name="fecha_pago" value={formData.fecha_pago} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="metodo_pago" className="form-label">Método de Pago</label>
        <select 
          className="form-control"
          id="metodo_pago"
          name="metodo_pago"
          value={formData.metodo_pago}
          onChange={handleChange}
          required
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <select 
          className="form-control"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Completado">Completado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {errorFormulario && (
        <div className="alert alert-danger" role="alert">
          {errorFormulario}
        </div>
      )}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary me-3" onClick={handleCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary" >{modo === 'crear' ? 'Guardar Pago' : 'Guardar Cambios'}</button>
      </div>
    </form>
  );

  return (
    <div>
      <h2>Pagos</h2> {/* Título principal */}
      
      {/* ELIMINADO: renderFormulario en la parte superior. */}

      <hr className="my-4" />

      <h2>Pagos Existentes</h2>
      
      {/* Contenedor añadido para el redondeo y centrado de la tabla */}
      <div className="reserva-table-container">
        <Table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>ID Pago</th>
              <th>ID Reserva</th>
              <th>Monto</th>
              <th>Fecha Pago</th>
              <th>Método Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id_pago}>
                <td>{pago.id_pago}</td>
                <td>{pago.id_reserva}</td>
                <td>${pago.monto}</td>
                <td>{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                <td>{pago.metodo_pago}</td>
                <td>{pago.estado}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditar(pago)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => borrarPago(pago.id_pago)}
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
            className="btn btn-success" 
            onClick={() => setModo('crear')}
        >
            Registrar Nuevo Pago
        </button>
      </div>
      
      {/* 2. Formulario (Solo se renderiza al hacer click o editar) */}
      {modo !== 'lista' && renderFormulario()}
    </div>
  );
};

export default PagosTable;