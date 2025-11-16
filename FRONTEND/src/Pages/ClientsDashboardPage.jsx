import React, { useState } from 'react';
import ClientsTable from '../Components/CRUD/ClientsTable';
import '../CSS/HabitacionesDashboardPage.css';

const ClientsDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <header className="top-app-bar">
          <button className="menu-button">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="page-title">Gestionar Clientes</h1>
          <div className="spacer"></div>
        </header>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              className="search-input"
              placeholder="Buscar cliente por nombre, documento o email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <main className="room-list">
          <div className="reservas-table-wrapper">
            <ClientsTable searchTerm={searchTerm} />
          </div>
        </main>
      </div>

      <button className="fab-button" onClick={() => window.scrollTo(0, 0)}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default ClientsDashboardPage;
