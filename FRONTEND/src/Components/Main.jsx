import React from "react";
import "../CSS/Main.css";
import Footer from "./Footer";


export default function Main() {
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
                    <input className="form-input" type="date" />
                  </label>
                  <label>
                    <p>Salida</p>
                    <input className="form-input" type="date" />
                  </label>
                  <label>
                    <p>Huéspedes</p>
                    <select className="form-select">
                      <option>2 adultos, 0 niños</option>
                      <option>2 adultos, 1 niño</option>
                      <option>1 adulto, 0 niños</option>
                    </select>
                  </label>
                  <button className="app-button">
                    <span>Ver Disponibilidad</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

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