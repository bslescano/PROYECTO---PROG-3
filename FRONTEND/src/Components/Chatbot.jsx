// src/components/Chatbot.jsx

import { useEffect } from 'react';

// 1. Obtenemos la URL del .env
const TIDIO_SRC = import.meta.env.VITE_TIDIO_SRC;

const Chatbot = () => {
  useEffect(() => {
    // 2. Revisamos si la URL existe (por si se nos olvida en el .env)
    if (!TIDIO_SRC) {
      console.error('La URL de Tidio (VITE_TIDIO_SRC) no está definida en .env');
      return;
    }

    // 3. Creamos el elemento <script>
    const script = document.createElement('script');
    script.src = TIDIO_SRC;
    script.async = true;

    // 4. Lo añadimos al final del <body>
    document.body.appendChild(script);

    // 5. Función de limpieza (Buena Práctica en React)
    // Esto elimina el script si el componente se "desmonta",
    // evitando duplicados si navegas entre páginas en una SPA.
    return () => {
      // Buscamos el script que acabamos de añadir
      const TidioScript = document.querySelector(`script[src="${TIDIO_SRC}"]`);
      if (TidioScript) {
        // Usamos parentNode.removeChild por compatibilidad
        TidioScript.parentNode.removeChild(TidioScript);
      }
      
      // Tidio también crea un <iframe> con un ID
      const tidioRoot = document.getElementById('tidio-chat-code');
      if (tidioRoot) {
        tidioRoot.parentNode.removeChild(tidioRoot);
      }
    };

  }, []); // El array vacío [] significa que este efecto se ejecuta 1 sola vez

  // Este componente no renderiza nada en el DOM
  return null;
};

export default Chatbot;