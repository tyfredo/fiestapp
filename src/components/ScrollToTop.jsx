import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto mueve la ventana al inicio (coordenadas 0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que el pathname (la ruta) cambia

  return null;
};

export default ScrollToTop;