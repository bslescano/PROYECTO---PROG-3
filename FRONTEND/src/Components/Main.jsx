import React, { useState } from "react";
import "../CSS/Main.css";
import Footer from "./Footer";
import GuestPicker from "./GuestPicker"; // Importar el nuevo componente


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

  const toggleAvailabilityModal = () => {
    setShowAvailabilityModal(!showAvailabilityModal);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
    // Si la fecha de salida es anterior a la nueva fecha de entrada, ajustarla
    if (checkOutDate && e.target.value && new Date(checkOutDate) <= new Date(e.target.value)) {
      const newCheckOut = new Date(e.target.value);
      newCheckOut.setDate(newCheckOut.getDate() + 1); // Establecer la salida al día siguiente de la entrada
      setCheckOutDate(newCheckOut.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutDateChange = (e) => {
    // Asegurarse de que la fecha de salida no sea anterior a la fecha de entrada
    if (checkInDate && new Date(e.target.value) <= new Date(checkInDate)) {
      // Opcional: mostrar un error al usuario o ajustar automáticamente
      const newCheckOut = new Date(checkInDate);
      newCheckOut.setDate(newCheckOut.getDate() + 1); // Forzar la salida al día siguiente de la entrada
      setCheckOutDate(newCheckOut.toISOString().split('T')[0]);
    } else {
      setCheckOutDate(e.target.value);
    }
  };

  // Funciones para manejar el GuestPicker
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
    setShowAvailabilityModal(true); // Abrir el modal inmediatamente al iniciar la verificación

    try {
      const backendUrl = 'http://localhost:3000/api/habitaciones/check-availability'; 
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkInDate, checkOutDate, adults: numAdults, children: numChildren }), // Enviar adultos y niños
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
                      min={checkInDate} // Establece la fecha mínima de salida
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
                <div className="card">
                  <img
                    alt="Moderna habitación de hotel estándar con un interior limpio y bien iluminado y una cama grande."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrk7oI4MZUROwfvwwajC7X0qTmNp7kqwwK_zOJ2XrS_xqBiV-bBBAHeTg9j4Tw7xx9mwu27SEBcMhZV4wsHi7AExqjrFRolXv_6xZXk8nX2P7cSZU9KrNIbVeo9JAKyMwG7NqPtQhmkPojDM4iZ_QoykceU1yq66cYvSFulhehkNBC89aJ6CEILhz4zpQ5eBLZBsNpeWh6IJx1WLFIWy4SjRY-ikqKUmHD9l2-7qwfxCHKzFkIsI3hG18Vq21Lk4RIW4ChEwEhE8"
                  />
                  <div className="card-content">
                    <h3>Habitación Estándar</h3>
                    <p>
                      Perfecta para viajeros solos o parejas, con todas las
                      comodidades esenciales.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <img
                    alt="Suite de lujo con una cama grande y una ventana panorámica con vistas a la ciudad."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtbBm5AGmHsQ3fvS6W73GiOrQvZFT6cT8IXUcop8-1HYUhOvKlGIAFOiz3fCI8IpVxgOyHT_-olyjOy1OMc4vTYmyU_QASToo_PzJ7xyHksxGGayu0gwDOkAod53lzP5fWwQl1B2WuhrQ48O_G3WeJ5aa9xyYmYwrlqfzf6ozCzjGOukfBBrDQ5-YjQ4yc3bGGKH0teSv_ZGp2dz6-IYau_cwsByTB7WQ5ZN9VVtWCwLu13Qp5LBBAqYAVXe1AJJgykz8jqZnMlI4"
                  />
                  <div className="card-content">
                    <h3>Suite con Vistas</h3>
                    <p>
                      Disfruta de vistas espectaculares y un espacio amplio y
                      elegante.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <img
                    alt="Amplia habitación familiar con varias camas y una cómoda zona de estar."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNO4Ak_5CsPhxrWRqdbgcsrDYpMpP-SWLeMyPnZfSaMJqttryz6P_5x_Vqj0VAsbu_bYhI2Ncg8n3uk9IVstkm-qhZiaDpN8T27cSpQVoj0CdBDf5NMmldSFr1DO7kv7ucS-hbXQRvjZ0zEgsZWZYLXXAxObAbfhmYCmUzi24iXqgiyL0jP-5ijbfOn8tbVgoasT0U3BKaWhGm2p67Wpz9LatFHriDLBLJZ-O2UNGrr5ejyjShUkelHsKldhQGwUWfpfkvaZLjjBc"
                  />
                  <div className="card-content">
                    <h3>Habitación Familiar</h3>
                    <p>
                      Espacio y comodidad para toda la familia durante su
                      estancia.
                    </p>
                  </div>
                </div>
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
        </main>

      </div>
    </div>
  );
}