import React, { useState } from "react";

const roomsSmalls = [
  { id: 1, name: "Habitacion 1", beds: 2, doubleBed: 1, singleBed: 2 },
  { id: 2, name: "Habitacion 2", beds: 2, doubleBed: 1, singleBed: 2 },
  { id: 3, name: "Habitacion 3", beds: 1, doubleBed: 1, singleBed: 0 },
  { id: 4, name: "Habitacion 4", beds: 2, doubleBed: 1, singleBed: 1 },
];

const roomsMediums = [
  { id: 5, name: "Habitacion 5", beds: 3, doubleBed: 1, singleBed: 2 },
  { id: 6, name: "Habitacion 6", beds: 4, doubleBed: 1, singleBed: 3 },
  { id: 7, name: "Habitacion 7", beds: 4, doubleBed: 1, singleBed: 3 },
  { id: 8, name: "Habitacion 8", beds: 4, doubleBed: 0, singleBed: 4 },
];

const roomsLarges = [
  { id: 9, name: "Habitacion 9", beds: 5, doubleBed: 1, singleBed: 4 },
  { id: 10, name: "Habitacion 10", beds: 5, doubleBed: 1, singleBed: 4 },
  { id: 11, name: "Habitacion 11", beds: 5, doubleBed: 1, singleBed: 4 },
  { id: 12, name: "Habitacion 12", beds: 5, doubleBed: 0, singleBed: 5 },
];

const allRooms = [...roomsSmalls, ...roomsMediums, ...roomsLarges];

const RoomAssigner = () => {
  const [formData, setFormData] = useState({ adults: 0, children: 0 });
  const [assignedRoom, setAssignedRoom] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPeople = formData.adults + formData.children;

    const suitableRoom = allRooms.find((room) => {
      const totalBeds = room.doubleBed * 2 + room.singleBed;
      return totalBeds >= totalPeople;
    });

    setAssignedRoom(suitableRoom || null);
  };

  return (
    <div>
      <h2>Formulario de reserva</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Adultos:
          <input
            type="number"
            name="adults"
            min="0"
            value={formData.adults}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Niños:
          <input
            type="number"
            name="children"
            min="0"
            value={formData.children}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Buscar habitación</button>
      </form>

      {assignedRoom ? (
        <div>
          <h3>Habitación asignada:</h3>
          <p>{assignedRoom.name}</p>
          <p>Camas dobles: {assignedRoom.doubleBed}</p>
          <p>Camas simples: {assignedRoom.singleBed}</p>
        </div>
      ) : (
        <p>{assignedRoom === null ? "" : "No hay habitaciones disponibles"}</p>
      )}
    </div>
  );
};

export default RoomAssigner;
