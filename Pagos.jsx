import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagos = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { reserva, precioPorNoche, noches, total } = state || {};

  const [datosPago, setDatosPago] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    direccion: '',
    metodoPago: 'Contado',
  });
  const [mostrarCamposTarjeta, setMostrarCamposTarjeta] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPago(prevState => ({ ...prevState, [name]: value }));

    if (name === 'metodoPago') {
      setMostrarCamposTarjeta(value === 'Tarjeta');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Procesando pago con los siguientes datos:", {
      reserva,
      ...datosPago,
      total
    });
    alert('¡Pago procesado con éxito!');
    navigate('/reservas');
  };

  if (!reserva) {
    return (
      <div className="alert alert-warning" role="alert">
        No hay datos de reserva para procesar el pago. Por favor, <a href="/reservas" className="alert-link">cree una reserva</a> primero.
      </div>
    );
  }

  return (
    <div>
      <h2>Formulario de Pago</h2>

      <div className="card mb-4">
        <div className="card-header">
          Resumen de la Reserva
        </div>
        <div className="card-body">
          <p><strong>Habitación ID:</strong> {reserva.id_habitacion}</p>
          <p><strong>Fechas:</strong> {new Date(reserva.fecha_entrada).toLocaleDateString()} al {new Date(reserva.fecha_salida).toLocaleDateString()} ({noches} noches)</p>
          <p><strong>Precio por Noche:</strong> ${precioPorNoche}</p>
          <h4 className="card-title">Total a Pagar: ${total}</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h4>Datos del Cliente</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="identificacion" className="form-label">DNI o Pasaporte</label>
          <input type="text" className="form-control" id="identificacion" name="identificacion" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" name="direccion" onChange={handleChange} required />
        </div>

        <h4>Método de Pago</h4>
        <div className="mb-3">
          <label htmlFor="metodoPago" className="form-label">Seleccionar opción de pago</label>
          <select className="form-select" id="metodoPago" name="metodoPago" value={datosPago.metodoPago} onChange={handleChange}>
            <option value="Contado">Contado</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        {mostrarCamposTarjeta && (
          <div className="card bg-light p-3">
            <h5>Datos de la Tarjeta</h5>
            <div className="mb-3">
              <label htmlFor="numeroTarjeta" className="form-label">Número de Tarjeta</label>
              <input type="text" className="form-control" id="numeroTarjeta" name="numeroTarjeta" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaVencimiento" className="form-label">Fecha de Vencimiento</label>
                <input type="text" className="form-control" id="fechaVencimiento" name="fechaVencimiento" placeholder="MM/AA" required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" name="cvv" placeholder="123" required />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-success mt-3 w-100">Pagar ${total}</button>
      </form>
    </div>
  );
};

export default Pagos;