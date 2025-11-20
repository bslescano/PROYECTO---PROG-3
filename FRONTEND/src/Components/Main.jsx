import React, { useState, useEffect } from "react";
import GuestPicker from "./GuestPicker"; // Importar el nuevo componente
import "../CSS/Main.css";
import Footer from "./Footer";

const API_BASE_URL = 'http://localhost:3000/api';

export default function Main() {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numAdults, setNumAdults] = useState(1); // Valor inicial para adultos
  const [numChildren, setNumChildren] = useState(0); // Valor inicial para niños
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('Cargando disponibilidad...');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Nuevos estados para cargar habitaciones
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [roomsError, setRoomsError] = useState(null);

  // Efecto para cargar las habitaciones al montar el componente
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/habitaciones`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRoomsError(error.message);
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const toggleAvailabilityModal = () => {
    setShowAvailabilityModal(!showAvailabilityModal);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
    if (checkOutDate && e.target.value && new Date(checkOutDate) <= new Date(e.target.value)) {
      const newCheckOut = new Date(e.target.value);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOutDate(newCheckOut.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutDateChange = (e) => {
    if (checkInDate && new Date(e.target.value) <= new Date(checkInDate)) {
      const newCheckOut = new Date(checkInDate);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOutDate(newCheckOut.toISOString().split('T')[0]);
    } else {
      setCheckOutDate(e.target.value);
    }
  };

  const handleGuestPickerClick = () => {
    setShowGuestPicker(!showGuestPicker);
  };

  const handleGuestConfirm = (adults, children) => {
    setNumAdults(adults);
    setNumChildren(children);
    setShowGuestPicker(false);
  };

  const handleGuestCancel = () => {
    setShowGuestPicker(false);
  };

  const checkAvailability = async () => {
    setIsLoading(true);
    setError(null);
    setAvailabilityMessage('Cargando disponibilidad...');
    setShowAvailabilityModal(true);

    try {
      const backendUrl = `${API_BASE_URL}/habitaciones/check-availability`; 
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkInDate, checkOutDate, adults: numAdults, children: numChildren }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar disponibilidad');
      }

      const data = await response.json();
      if (data.available) {
        setAvailabilityMessage('¡Hay habitaciones disponibles para las fechas seleccionadas!');
      } else {
        setAvailabilityMessage('Lo sentimos, no hay habitaciones disponibles para las fechas y número de huéspedes seleccionados.');
      }
    } catch (err) {
      setError(err.message);
      setAvailabilityMessage('Error: No se pudo verificar la disponibilidad. Intente nuevamente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        
        <main>
          <section className="hero-section">
            <div
              className="hero-content"
              aria-label="Área de piscina de hotel de lujo con tumbonas y sombrillas al atardecer"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(\'public/images/background-hotel.jpg\')',
              }}
            >
              <div className="text-container">
                <h1>Bienvenidos a Hotel California</h1>
              </div>
            </div>
          </section>

          <section className="booking-section">
            <div className="container">
              <div className="form-container">
                <div className="grid">
                  <label>
                    <p>Entrada</p>
                    <input className="form-input" type="date" value={checkInDate} onChange={handleCheckInDateChange} />
                  </label>
                  <label>
                    <p>Salida</p>
                    <input 
                      className="form-input" 
                      type="date" 
                      value={checkOutDate} 
                      onChange={handleCheckOutDateChange}
                      min={checkInDate}
                    />
                  </label>
                  <label className="guest-picker-label-container">
                    <p>Huéspedes</p>
                    <div className="form-input guest-display" onClick={handleGuestPickerClick}>
                      {`${numAdults} adulto${numAdults !== 1 ? 's' : ''}, ${numChildren} niño${numChildren !== 1 ? 's' : ''}`}
                    </div>
                    {showGuestPicker && (
                      <GuestPicker
                        initialAdults={numAdults}
                        initialChildren={numChildren}
                        onConfirm={handleGuestConfirm}
                        onCancel={handleGuestCancel}
                      />
                    )}
                  </label>
                  <button className="app-button" onClick={checkAvailability}>
                    <span>Ver Disponibilidad</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {showAvailabilityModal && (
            <div className="availability-modal-overlay" onClick={toggleAvailabilityModal}>
              <div className="availability-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Disponibilidad</h2>
                {isLoading && <p>Cargando disponibilidad...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!isLoading && !error && <p>{availabilityMessage}</p>}
                <p>Para acordar una estadía o sacarse dudas, llame al: <strong>+54 9 3811234567</strong></p>
                <button onClick={toggleAvailabilityModal}>Cerrar</button>
              </div>
            </div>
          )}

          <section className="rooms-section">
            <div className="container">
              <div className="text-center">
                <h2>Explora Nuestras Habitaciones</h2>
                <p>Diseñadas para tu máximo confort y relajación.</p>
              </div>
              <div className="grid">
                {isLoadingRooms && <p>Cargando habitaciones...</p>}
                {roomsError && <p style={{ color: 'red' }}>Error al cargar habitaciones: {roomsError}</p>}
                {!isLoadingRooms && rooms.length === 0 && <p>No hay habitaciones disponibles para mostrar.</p>}
                {!isLoadingRooms && rooms.length > 0 && rooms.map(room => (
                  <div className="card" key={room.id_habitacion}>
                    <img
                      alt={room.descripcion || `Imagen de la habitación ${room.numero}`}
                      src={room.url_imagen || 'https://via.placeholder.com/400x250.png?text=No+Image'} 
                    />
                    <div className="card-content">
                      <h3>{room.tipo} - Habitación {room.numero}</h3>
                      <p>{room.descripcion || 'No hay descripción disponible para esta habitación.'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="services-section">
            <div className="container">
              <div className="text-center">
                <h2>Servicios Exclusivos</h2>
                <p>Todo lo que necesitas para una estancia inolvidable.</p>
              </div>
              <div className="grid">
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">wifi</span>
                  </div>
                  <p>Wi-Fi Gratis</p>
                </div>
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">pool</span>
                  </div>
                  <p>Piscina</p>
                </div>
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">spa</span>
                  </div>
                  <p>Spa & Wellness</p>
                </div>
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <p>Restaurante</p>
                </div>
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">
                      fitness_center
                    </span>
                  </div>
                  <p>Gimnasio</p>
                </div>
                <div className="service-item">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">
                      local_parking
                    </span>
                  </div>
                  <p>Parking</p>
                </div>
              </div>
            </div>
          </section>

          <section className="testimonials-section">
            <div className="container">
              <div className="text-center">
                <h2>Lo que dicen nuestros huéspedes</h2>
              </div>
              <div className="grid">
                <div className="card">
                  <div className="stars">
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                  </div>
                  <p className="review-text">
                    'Una experiencia absolutamente increíble. El personal fue
                    atento, las habitaciones impecables y las vistas eran para
                    morirse. ¡Volveremos seguro!'
                  </p>
                  <p className="author">- Ana García</p>
                </div>
                <div className="card">
                  <div className="stars">
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star_half</span>
                  </div>
                  <p className="review-text">
                    'El hotel es precioso y la ubicación es perfecta. El servicio
                    de spa fue el punto culminante de nuestro viaje. Muy
                    recomendable para una escapada relajante.'
                  </p>
                  <p className="author">- Carlos Martínez</p>
                </div>
                <div className="card">
                  <div className="stars">
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                    <span className="material-symbols-outlined">star</span>
                  </div>
                  <p className="review-text">
                    'Ideal para familias. La piscina es fantástica y el personal
                    hizo todo lo posible para que nuestros hijos se sintieran
                    bienvenidos. ¡Una estancia de 10!'
                  </p>
                  <p className="author">- Familia López</p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>

      </div>
    </div>
  );
}