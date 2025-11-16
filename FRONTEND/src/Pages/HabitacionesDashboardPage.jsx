import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../CSS/HabitacionesDashboardPage.css';
import HabitacionForm from '../Components/HabitacionForm';

// Mapeo de estados para una visualización más amigable
const statusMap = {
  disponible: { text: 'Disponible', className: 'available' },
  ocupada: { text: 'Ocupada', className: 'occupied' },
  mantenimiento: { text: 'En Limpieza', className: 'cleaning' },
};

const URL_HABITACIONES = 'http://localhost:3000/api/habitaciones'; // Asegúrate que esta URL sea correcta

const HabitacionesDashboardPage = () => {
  // --- ESTADOS ---
  const [habitaciones, setHabitaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Simples'); // Pestaña activa por defecto
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabitacion, setCurrentHabitacion] = useState(null); // Para saber si creamos o editamos

  // --- EFECTOS ---
  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setError(null);
        const response = await axios.get(URL_HABITACIONES);
        // Mapeamos los datos del backend al formato que el frontend espera
        const habitacionesMapeadas = response.data.map(h => ({
          ...h,
          // Campos para consistencia con el frontend
          tipo_habitacion: h.tipo,
          numero_habitacion: h.numero,
          // Asignamos una imagen por defecto si no viene del backend
          imagen_url: h.imagen_url || 'https://via.placeholder.com/150/e2e8f0/4a5568?text=Sin+Imagen'
        }));
        setHabitaciones(habitacionesMapeadas);
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        setError("No se pudieron cargar las habitaciones. Revisa la conexión con el backend.");
      }
    };
    cargarDatos();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const filteredHabitaciones = useMemo(() => {
    return habitaciones
      .filter(h => {
        // Filtrar por pestaña activa (tipo de habitación)
        if (activeTab === 'Simples') return h.tipo_habitacion === 'Simple';
        if (activeTab === 'Dobles') return h.tipo_habitacion === 'Doble';
        if (activeTab === 'Suites') return h.tipo_habitacion === 'Suite';
        return true;
      })
      .filter(h =>
        // Filtrar por término de búsqueda
        (h.nombre && h.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        h.tipo_habitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.numero_habitacion.toString().includes(searchTerm)
      );
  }, [habitaciones, searchTerm, activeTab]);

  // --- MANEJADORES DE EVENTOS ---
  const handleOpenModalParaCrear = () => {
    setCurrentHabitacion(null); // Limpiamos para asegurar que es modo 'crear'
    setIsModalOpen(true);
  };

  const handleOpenModalParaEditar = (habitacion) => {
    setCurrentHabitacion(habitacion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentHabitacion(null);
  };

  const handleSave = async (formData) => {
    try {
      if (currentHabitacion) {
        // --- MODO EDICIÓN ---
        const response = await axios.put(
          `${URL_HABITACIONES}/${currentHabitacion.id_habitacion}`,
          formData
        );
        // Unificamos la lógica: siempre aseguramos que la imagen por defecto esté presente.
        const habitacionActualizada = {
          ...response.data,
          // Mapeamos la respuesta del backend al formato del frontend
          tipo_habitacion: response.data.tipo,
          numero_habitacion: response.data.numero,
          imagen_url: response.data.imagen_url || 'https://via.placeholder.com/150/e2e8f0/4a5568?text=Sin+Imagen'
        };
        setHabitaciones(habitaciones.map(h => 
          h.id_habitacion === currentHabitacion.id_habitacion ? habitacionActualizada : h
        ));
      } else {
        // --- MODO CREACIÓN ---
        const response = await axios.post(URL_HABITACIONES, formData);
        // Mapeamos la respuesta del backend al formato que el frontend espera
        const nuevaHabitacion = {
          ...response.data,
          // Añadimos los campos que el frontend usa para renderizar
          tipo_habitacion: response.data.tipo,
          numero_habitacion: response.data.numero,
          // Aseguramos que la nueva habitación también tenga una imagen por defecto si es necesario
          imagen_url: response.data.imagen_url || 'https://via.placeholder.com/150/e2e8f0/4a5568?text=Sin+Imagen'
        };
        setHabitaciones([...habitaciones, nuevaHabitacion]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar la habitación:", error);
      // Sería ideal mostrar este error en el modal
      setError(error.response?.data?.details || "No se pudo guardar la habitación.");
    }
  };

  const handleBorrar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta habitación?')) {
      try {
        await axios.delete(`${URL_HABITACIONES}/${id}`);
        setHabitaciones(habitaciones.filter(h => h.id_habitacion !== id));
      } catch (error) {
        console.error(`Error al borrar habitación ${id}:`, error);
        setError(error.response?.data?.details || "Error al eliminar la habitación.");
      }
    }
  };

  // --- RENDERIZADO ---
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <header className="top-app-bar">
          <button className="menu-button">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="page-title">Gestionar Habitaciones</h1>
          <div className="spacer"></div>
        </header>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              className="search-input"
              placeholder="Buscar por nombre o número"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <nav className="tabs-nav">
          <div className="tabs-container">
            {['Simples', 'Dobles', 'Suites'].map(tab => (
              <button
                key={tab}
                className={`tab-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <p className={`tab-text ${activeTab === tab ? 'active' : ''}`}>{tab}</p>
              </button>
            ))}
          </div>
        </nav>

        <main className="room-list">
          {error && <p className="error-message">{error}</p>}

          {!error && filteredHabitaciones.length > 0 && filteredHabitaciones.map(h => {
            const statusInfo = statusMap[h.estado] || { text: h.estado, className: '' };
            return (
              <div className="room-card" key={h.id_habitacion}>
                <div className="room-image" style={{ backgroundImage: `url("${h.imagen_url}")` }}></div>
                <div className="room-details">
                  <p className="room-name">{h.nombre || `${h.tipo_habitacion} ${h.numero_habitacion}`}</p>
                  <p className="room-price">${h.precio_noche}/noche</p>
                  <div className="room-status-wrapper">
                    <span className={`room-status ${statusInfo.className}`}>{statusInfo.text}</span>
                  </div>
                </div>
                <div className="room-actions">
                  <button className="action-button" onClick={() => handleOpenModalParaEditar(h)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="action-button action-button-delete" onClick={() => handleBorrar(h.id_habitacion)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            );
          })}

          {!error && filteredHabitaciones.length === 0 && (
            <div className="empty-state-card" style={{ display: 'flex' }}>
              <div className="empty-state-icon-wrapper">
                <span className="material-symbols-outlined">search_off</span>
              </div>
              <p className="empty-state-title">No se encontraron habitaciones</p>
              <p className="empty-state-text">Prueba con otro filtro o término de búsqueda.</p>
            </div>
          )}
        </main>
      </div>

      <button className="fab-button" onClick={handleOpenModalParaCrear}>
        <span className="material-symbols-outlined">add</span>
      </button>

      <HabitacionForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        habitacion={currentHabitacion}
      />
    </div>
  );
};

export default HabitacionesDashboardPage;