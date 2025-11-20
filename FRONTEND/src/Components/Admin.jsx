import React from 'react'
import {
  RESERVAS_DASHBOARD,
  CLIENTS_DASHBOARD,
  HABITACIONES_DASHBOARD,
  PAGOS_DASHBOARD
} from "../Routers/router";

import { Link } from 'react-router-dom';
import '../CSS/Admin.css';

const Admin = () => {
    const dashboardItems = [
    {
      to: RESERVAS_DASHBOARD,
      title: 'Administrar Reservas',
      description: 'Gestiona las reservas de los clientes, crea nuevas y actualiza las existentes.',
      icon: 'book_online'
    },
    {
      to: CLIENTS_DASHBOARD,
      title: 'Administrar Clientes',
      description: 'Consulta, edita y gestiona la información de los clientes del hotel.',
      icon: 'group'
    },
    {
      to: HABITACIONES_DASHBOARD,
      title: 'Administrar Habitaciones',
      description: 'Gestiona las habitaciones, sus tipos, precios y disponibilidad.',
      icon: 'bed'
    },
    {
      to: PAGOS_DASHBOARD,
      title: 'Administrar Pagos',
      description: 'Registra y gestiona los pagos asociados a las reservas.',
      icon: 'payments'
    }
  ];

  return (
    <div className="page-wrapper">
      <main>
        <section className="rooms-section">
          <div className="container">
            <div className="text-center">
              <h2>Panel de Administración</h2>
              <p>Seleccione una sección para gestionar el contenido.</p>
            </div>
            <div className="grid">
              {dashboardItems.map((item, index) => (
                <Link to={item.to} key={index} className="card-link">
                  <div className="card">
                    <div className="card-content text-center">
                      <div className="icon-wrapper">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin