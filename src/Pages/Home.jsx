
import React from "react";

const Home = () => {
  return (

    <div className="container mt-4">
      <img
        src="https://www.hotelespanoramicos.com/wp-content/uploads/2022/02/arenas-3-scaled.jpg"
        alt="Hotel panorámico"
        style={{
          width: '100%',        // ocupa todo el ancho del container
          height: 'auto',       // se ajusta en altura
          objectFit: 'cover',   // se adapta al espacio
          display: 'block',     // elimina espacio blanco extra
          border: 'none',       // sin bordes
        }}
      />
    </div>
  );
};

export default Home;
