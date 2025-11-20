import React from 'react';
import HabitacionesTable from '../Components/CRUD/HabitacionesTable';
import '../CSS/Main.css';

const DashboardPage = () => {
  return (
    <div className="page-wrapper">
      <main className="contenedor-principal">
        <div className="container mt-5">
          <h1 className="text-center mb-4">Administración de Habitaciones</h1>
          <HabitacionesTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
