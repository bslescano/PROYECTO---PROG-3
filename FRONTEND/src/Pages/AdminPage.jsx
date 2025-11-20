import React, { useState } from 'react';
import Admin from '../Components/Admin';
import '../CSS/HabitacionesDashboardPage.css';


const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="main-container">
      <div className="content-wrapper">
        
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              className="search-input"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <main className="room-list">
          <div className="reservas-table-wrapper">
            <Admin searchTerm={searchTerm} />
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminPage;