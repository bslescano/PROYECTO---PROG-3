import React from "react";
import "../CSS/Main.css";

export default function Main() {

  return (
    <div className="page-wrapper">

      <main>

        {/* HERO */}
        <section className="hero-section">
          <div
            className="hero-content"
            aria-label="Área de piscina de hotel de lujo con tumbonas y sombrillas al atardecer"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('/images/background-hotel.jpg')",
            }}
          >
            <div className="text-container">
              <h1>Bienvenidos a Hotel California</h1>
            </div>
          </div>
        </section>

        {/* BOOKING */}
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

        {/* HABITACIONES */}
        <section className="rooms-section">
          <div className="container">
            <div className="text-center">
              <h2>Nuestras Habitaciones más populares</h2>
              <p>Diseñadas para tu máximo confort y relajación.</p>
            </div>

            <div className="grid">

              {/* CARD 1 */}
              <div className="card">
                <img
                  alt="Moderna habitación de hotel estándar."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrk7oI4MZUROwfvwwajC7X0qTmNp7kqwwK_zOJ2XrS_xqBiV-bBBAHeTg9j4Tw7xx9mwu27SEBcMhZV4wsHi7AExqjrFRolXv_6xZXk8nX2P7cSZU9KrNIbVeo9JAKyMwG7NqPtQhmkPojDM4iZ_QoykceU1yq66cYvSFulhehkNBC89aJ6CEILhz4zpQ5eBLZBsNpeWh6IJx1WLFIWy4SjRY-ikqKUmHD9l2-7qwfxCHKzFkIsI3hG18Vq21Lk4RIW4ChEwEhE8"
                />
                <div className="card-content">
                  <h3>Habitación Doble</h3>
                  <p>Perfecta para viajeros solos o parejas.</p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="card">
                <img
                  alt="Suite con vistas."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtbBm5AGmHsQ3fvS6W73GiOrQvZFT6cT8IXUcop8-1HYUhOvKlGIAFOiz3fCI8IpVxgOyHT_-olyjOy1OMc4vTYmyU_QASToo_PzJ7xyHksxGGayu0gwDOkAod53lzP5fWwQl1B2WuhrQ48O_G3WeJ5aa9xyYmYwrlqfzf6ozCzjGOukfBBrDQ5-YjQ4yc3bGGKH0teSv_ZGp2dz6-IYau_cwsByTB7WQ5ZN9VVtWCwLu13Qp5LBBAqYAVXe1AJJgykz8jqZnMlI4"
                />
                <div className="card-content">
                  <h3>Suite con Vistas</h3>
                  <p>Vistas espectaculares y espacio elegante.</p>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="card">
                <img
                  alt="Habitación familiar."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNO4Ak_5CsPhxrWRqdbgcsrDYpMpP-SWLeMyPnZfSaMJqttryz6P_5x_Vqj0VAsbu_bYhI2Ncg8n3uk9IVstkm-qhZiaDpN8T27cSpQVoj0CdBDf5NMmldSFr1DO7kv7ucS-hbXQRvjZ0zEgsZWZYLXXAxObAbfhmYCmUzi24iXqgiyL0jP-5ijbfOn8tbVgoasT0U3BKaWhGm2p67Wpz9LatFHriDLBLJZ-O2UNGrr5ejyjShUkelHsKldhQGwUWfpfkvaZLjjBc"
                />
                <div className="card-content">
                  <h3>Habitación Familiar</h3>
                  <p>Espacio y comodidad para toda la familia.</p>
                </div>
              </div>

              {/* EXTRA CARDS */}
              <div className="card">
                <img
                  alt="Habitación de lujo"
                  src="https://th.bing.com/th/id/R.42e0b349894dcdbccd27a64a5fe11780?rik=FwSUvDAZjIoxmQ&pid=ImgRaw&r=0"
                />
                <div className="card-content">
                  <h3>Retiro Ámbar</h3>
                  <p>Cama doble, living y excelente vista.</p>
                </div>
              </div>

              <div className="card">
                <img
                  alt="Habitación estrella"
                  src="https://b2991450.smushcdn.com/2991450/wp-content/uploads/2024/02/hotel_room_lighting.png?lossy=0&strip=1&webp=1"
                />
                <div className="card-content">
                  <h3>Habitación Estrella</h3>
                  <p>Perfecta para estancias prolongadas.</p>
                </div>
              </div>

              <div className="card">
                <img
                  alt="Habitación Familiar 2"
                  src="https://www.swanscayhotel.com/wp-content/uploads/2022/05/hotel-en-bocas-del-toro-habitaciones-familiares.jpg"
                />
                <div className="card-content">
                  <h3>Habitación Familiar 2</h3>
                  <p>Amplia, luminosa y con balcón.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="services-section">
          <div className="container">
            <div className="text-center">
              <h2>Servicios Exclusivos</h2>
              <p>Todo lo que necesitas para una estancia inolvidable.</p>
            </div>

            <div className="grid">
              {[
                ["wifi", "Wi-Fi Gratis"],
                ["pool", "Piscina"],
                ["spa", "Spa & Wellness"],
                ["restaurant", "Restaurante"],
                ["fitness_center", "Gimnasio"],
                ["local_parking", "Parking"],
              ].map(([icon, text]) => (
                <div className="service-item" key={text}>
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="testimonials-section">
          <div className="container">
            <div className="text-center">
              <h2>Lo que dicen nuestros huéspedes</h2>
            </div>

            <div className="grid">

              {/* Testimonio 1 */}
              <div className="card">
                <div className="stars">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="material-symbols-outlined">star</span>
                  ))}
                </div>
                <p className="review-text">
                  "Una experiencia increíble. Habitaciones impecables y vistas hermosas."
                </p>
                <p className="author">- Ana García</p>
              </div>

              {/* Testimonio 2 */}
              <div className="card">
                <div className="stars">
                  {[1,2,3,4].map(n => (
                    <span key={n} className="material-symbols-outlined">star</span>
                  ))}
                  <span className="material-symbols-outlined">star_half</span>
                </div>
                <p className="review-text">
                  "El hotel es precioso. El spa fue lo mejor del viaje."
                </p>
                <p className="author">- Carlos Martínez</p>
              </div>

              {/* Testimonio 3 */}
              <div className="card">
                <div className="stars">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="material-symbols-outlined">star</span>
                  ))}
                </div>
                <p className="review-text">
                  "Ideal para familias. Mis hijos la pasaron increíble."
                </p>
                <p className="author">- Familia López</p>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
