import React from "react";
import Header from "../Components/Header";

const styles = {
container: {
  padding: "150px 40px",
  maxWidth: "1600px",
  margin: "0 auto", // 0 arriba/abajo, centrado horizontal
  textAlign: "center",
  backgroundColor: "#ffffffff",
  minHeight: "100vh", // ocupa toda la altura de la ventana
},

  title: {
    fontFamily: "serif",
    fontSize: "70px",
    marginBottom: "60px",
    color: "#030303ff",
  },
  description: {
    fontSize: "23px",
    marginBottom: "100px",
    color: "#070606ff",
   
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas fijas
    gap: "60px", // espacio entre tarjetas
    marginBottom: "100px",
  },
  card: {
    backgroundColor: "#434f6dff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(90, 102, 153, 0.9)",
    color: "#faf3f3ff",
  },
  image: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
  text: {
    padding: "8px",
    fontSize: "25px",
    fontWeight: "500",
  },
  footerText: {
    fontSize: "30px",
    marginTop: "180px",
    fontWeight: "500",
    color: "#130d0dff",
    fontFamily: "serif",
  },
  button: {
    marginTop: "70px",
    padding: "30px 40px",
    backgroundColor: "#2c2955ff",
    color: "#e4e6ecff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "25px",
  },
  footerContainer: {
  marginTop: "100px",
  textAlign: "center",
},


    
};     

// Lista de promociones
const promos = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/5fa1522044bdda192713063c/1688032681659-BO7P8AGM3OKGOXD95LBK/20230627_113746-v2.jpg",
    title: "Asistencia a la habitación",
  },
  {
    img: "https://babumagazine.com/wp-content/uploads/2019/09/desayuno-sano-buffet-portada.jpg",
    title: "Desayuno",
  },
  {
    img: "https://th.bing.com/th/id/R.9cccda18118350b65fc88b37c33b8870?rik=xNSXo2GucLw%2bZw&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f5fa1522044bdda192713063c%2ft%2f649d575b961bd33a89ac9f45%2f1688033119154%2f20230627_113746-v2.jpg%3fformat%3d1500w&ehk=rKhVL1caZhEkZ2gKhgJrkGZ2DVW9TK6LixDWXH0F%2bCE%3d&risl=&pid=ImgRaw&r=0",
    title: "Buffet",
  },
  // Ejemplo de más promociones
  { img: "https://tse1.mm.bing.net/th/id/OIP.r6jEfUu7Jxqu2KiGES_rDAHaEi?w=1920&h=1175&rs=1&pid=ImgDetMain&o=7&rm=3", title: "Piscina Piso 2" },
  { img: "https://checkhotels.com.br/wp-content/uploads/2021/02/Design-sem-nome-25-1170x658.png", title: "Piscina al aire libre" },
  { img: "https://www.e-chalupy.cz/stredni_cechy/_17398/soukroma-virivka-3eb8-.jpeg", title: "Jacuzzi" },
  { img: "https://th.bing.com/th/id/R.a7e892c9ebcc4c456b87cf830b06ef73?rik=A50q4WugHEpcYQ&pid=ImgRaw&r=0", title: "Spa" },
  { img: "https://i.pinimg.com/originals/9b/42/30/9b42304651ee57257d0f8a2d6fb49948.jpg", title: "Gymnasio" },
  { img: "https://images.hotelostend.be/201748122137161-parking-2.jpg-big.jpg", title: "Estacionamiento Privado" },
];

const ServiciosPage = () => {
  return (
    <div>
      <Header />

      <div className="promos-container" style={styles.container}>
        <h2 style={styles.title}>Nuestros servicios</h2>

        <p style={styles.description}>
          En Hotel California pensamos en tu comodidad y tu economía. Disfrutá
          nuestras servicios exclusivas para que vivas una experiencia
          inolvidable.
        </p>

        {/* GRID DE PROMOCIONES */}
        <div style={styles.grid}>
          {promos.map((promo, i) => (
            <div key={i} style={styles.card}>
              <img src={promo.img} alt={promo.title} style={styles.image} />
              <p style={styles.text}>{promo.title}</p>
            </div>
          ))}
        </div>

        <p style={styles.footerText}>
          Elige la opción que más te guste. ¡El Hotel te espera!
        </p>
        <a
            href="https://wa.me/5438150120269?text=Hola%20quiero%20reservar"
          target="_blank"
           rel="noopener noreferrer"
        >
        <button style={styles.button}>Reservar</button>
        </a>

      </div>


    </div>
  
  );
};

export default ServiciosPage;
