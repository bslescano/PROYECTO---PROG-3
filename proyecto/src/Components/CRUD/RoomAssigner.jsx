import React, { useState } from 'react';



const RoomAssigner = () => {
  // Estado para las habitaciones (ahora pueden cambiar su estado de ocupación)
  const [rooms, setRooms] = useState(initialRoomsData);
  const [formData, setFormData] = useState({ adults: 0, children: 0 });
  const [assignedRoom, setAssignedRoom] = useState(null);
  const [message, setMessage] = useState(''); // Para mensajes al usuario

// Datos de habitaciones (simulamos que pueden estar ocupadas)
const initialRoomsData = [
  { id: 1, name: "Habitacion 1", beds: 2, doubleBed: 1, singleBed: 2, isOccupied: false },
  { id: 2, name: "Habitacion 2", beds: 2, doubleBed: 1, singleBed: 2, isOccupied: false },
  { id: 3, name: "Habitacion 3", beds: 1, doubleBed: 1, singleBed: 0, isOccupied: false },
  { id: 4, name: "Habitacion 4", beds: 2, doubleBed: 1, singleBed: 1, isOccupied: false },
  { id: 5, name: "Habitacion 5", beds: 3, doubleBed: 1, singleBed: 2, isOccupied: false },
  { id: 6, name: "Habitacion 6", beds: 4, doubleBed: 1, singleBed: 3, isOccupied: false },
  { id: 7, name: "Habitacion 7", beds: 4, doubleBed: 1, singleBed: 3, isOccupied: false },
  { id: 8, name: "Habitacion 8", beds: 4, doubleBed: 0, singleBed: 4, isOccupied: false },
  { id: 9, name: "Habitacion 9", beds: 5, doubleBed: 1, singleBed: 4, isOccupied: false },
  { id: 10, name: "Habitacion 10", beds: 5, doubleBed: 1, singleBed: 4, isOccupied: false },
  { id: 11, name: "Habitacion 11", beds: 5, doubleBed: 1, singleBed: 4, isOccupied: false },
  { id: 12, name: "Habitacion 12", beds: 5, doubleBed: 0, singleBed: 5, isOccupied: false },
];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value) || 0, // Asegura que sea un número, o 0 si está vacío
    });
    setMessage(''); // Limpia mensajes al cambiar los inputs
    setAssignedRoom(null); // Resetea la habitación asignada al cambiar los inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPeople = formData.adults + formData.children;

    if (totalPeople <= 0) {
      setMessage('Por favor, ingresa al menos 1 persona (adulto o niño).');
      setAssignedRoom(null);
      return;
    }

    // Ordenamos las habitaciones de menor a mayor capacidad total de camas
    // Y luego por la primera disponible (esto es una lógica simple de "mejor ajuste")
    const availableRooms = rooms
      .filter(room => !room.isOccupied) // Solo habitaciones no ocupadas
      .sort((a, b) => {
        const totalBedsA = a.doubleBed * 2 + a.singleBed;
        const totalBedsB = b.doubleBed * 2 + b.singleBed;
        return totalBedsA - totalBedsB; // Ordena por capacidad ascendente
      });

    const suitableRoom = availableRooms.find((room) => { // Encontrar la primera habitación que cumpla con los requisitos 
      const totalBeds = room.doubleBed * 2 + room.singleBed;
      return totalBeds >= totalPeople;
    });

    if (suitableRoom) {
      setAssignedRoom(suitableRoom);
      setMessage(`¡Éxito! Se ha asignado la ${suitableRoom.name}.`);

      // Simulamos la ocupación de la habitación en el estado local
      setRooms(prevRooms =>
        prevRooms.map(room =>
          room.id === suitableRoom.id ? { ...room, isOccupied: true } : room
        )
      );
      setFormData({ adults: 0, children: 0 }); // Limpiamos el formulario
    } else {
      setAssignedRoom(null);
      setMessage('Lo sentimos, no hay habitaciones disponibles que cumplan con los criterios.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Formulario de Reserva y Asignación de Habitación</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Adultos:
            <input
              type="number"
              name="adults"
              min="0"
              value={formData.adults}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Niños:
            <input
              type="number"
              name="children"
              min="0"
              value={formData.children}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Buscar y Asignar Habitación
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', color: assignedRoom ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {assignedRoom && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>¡Habitación Asignada!</h3>
          <p><strong>Nombre:</strong> {assignedRoom.name}</p>
          <p><strong>Camas dobles:</strong> {assignedRoom.doubleBed}</p>
          <p><strong>Camas simples:</strong> {assignedRoom.singleBed}</p>
          <p>Total de camas: {assignedRoom.doubleBed * 2 + assignedRoom.singleBed}</p>
        </div>
      )}

      {/* Tabla de Habitaciones para ver el estado actual */}
      <h3 style={{ marginTop: '40px' }}>Estado Actual de las Habitaciones</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Nombre</th>
            <th style={tableHeaderStyle}>Camas Dobles</th>
            <th style={tableHeaderStyle}>Camas Simples</th>
            <th style={tableHeaderStyle}>Total Camas</th>
            <th style={tableHeaderStyle}>Ocupada</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} style={{ backgroundColor: room.isOccupied ? '#fdd' : 'white' }}>
              <td style={tableCellStyle}>{room.id}</td>
              <td style={tableCellStyle}>{room.name}</td>
              <td style={tableCellStyle}>{room.doubleBed}</td>
              <td style={tableCellStyle}>{room.singleBed}</td>
              <td style={tableCellStyle}>{room.doubleBed * 2 + room.singleBed}</td>
              <td style={tableCellStyle}>{room.isOccupied ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos básicos para la tabla
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default RoomAssigner; // ¡Exportamos el nombre correcto del componente!
