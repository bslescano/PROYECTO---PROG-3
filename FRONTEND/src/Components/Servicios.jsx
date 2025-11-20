const ServiciosPage = () => {
    // Datos de ejemplo para las promociones
    const promotions = [
        { id: 1, title: "Escapada Romántica (3 Días)", details: "Incluye botella de champagne y desayuno en la habitación. Descuento del 20%.", color: "bg-pink-100", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
        { id: 2, title: "Semana Familiar de Verano", details: "7 noches al precio de 6, acceso gratuito a todas las actividades infantiles.", color: "bg-blue-100", icon: "M17 21h-2v-2h-2v-2h-2v-2H9v-2H7v-2H5V7h2V5h2V3h2V2h2v1h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2v2z" },
        { id: 3, title: "Oferta Last Minute (Solo Martes)", details: "Descuento del 35% en reservas hechas con menos de 24 horas de antelación.", color: "bg-yellow-100", icon: "M10 20h4V4h-4v16zM4 14h4v-4H4v4zM16 14h4v-4h-4v4z" },
    ];

    // SVG para el icono de flecha
    const ArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                Promociones y Ofertas Especiales
            </h2>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                Descubre nuestras ofertas imperdibles para hacer de tu estadía una experiencia inolvidable a un precio inigualable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {promotions.map(promo => (
                    <div 
                        key={promo.id} 
                        className={`p-6 ${promo.color} rounded-3xl shadow-xl border-t-8 border-indigo-600 transform transition duration-500 hover:shadow-2xl hover:-translate-y-1`}
                    >
                        <div className="flex items-center mb-4">
                            {/* SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d={promo.icon} />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-800">{promo.title}</h3>
                        </div>
                        <p className="text-gray-700 mb-6">{promo.details}</p>
                        <button className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md group">
                            Reservar Ahora
                            <ArrowIcon />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiciosPage;

