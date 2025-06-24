import React from 'react';
import { FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', width: '100%' }}>
      
    
      <div
        style={{
          backgroundColor: '#FFD700',
          color: 'black',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '16px',
          textAlign: 'center',
        }}
      >
        Regístrate y conocé los descuentos disponibles
      </div>

      {/* Contenido principal */}
      <div style={{ padding: '30px 20px' }}>
        
        {/*Hoteel*/}
        <p style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'serif', marginBottom: '10px' }}>
          
          Tu mejor opción: Hotel California
        </p>

        {/* Contacto */}
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          CONTACTO:
        </p>

        {/* Abajo integré las Redes sociales */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', fontSize: '24px' }}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', fontSize: '24px' }}
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="mailto:contacto@hotelcalifornia.com"
            style={{ color: 'white', fontSize: '24px' }}
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Parte para acomodar el video */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {/* Video alineado a la izquierda */}
          <div style={{ flex: '1 1 600px', maxWidth: '600px' }}>
            <iframe
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/4_lzrprot5U"
              title="Video del hotel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            ></iframe>
          </div>

          {/* Mapa de SMT */}
          <div style={{ flex: '1 1 320px', maxWidth: '400px' }}>
            <iframe
              title="Mapa San Javier Tucumán"
              width="100%"
              height="350"
              style={{
                border: '3px solid white',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
              src="https://www.bing.com/maps/embed?h=300&w=400&cp=-26.766121864318848~-65.38703155517578&lvl=14&typ=d&sty=r&src=SHELL&form=BMEMJS"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <hr />

        {/* D. de autor*/}
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          © 2025 Hotel California. Todos los derechos reservados. <br />
          Uso autorizado para fines personales. <br />
          Prohibida la reproducción total o parcial sin permiso.
        </div>
      </div>
    </footer>
  );
};

export default Footer;