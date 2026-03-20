import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BodaLayout from './layouts/BodaLayout';
import XVLayout from './layouts/XVLayout';
import KidsLayout from './layouts/KidsLayout';
import ScrollToTop from './components/ScrollToTop';
import logoFiestapp from './assets/logo.png';

// --- DATOS DE PREGUNTAS FRECUENTES ---
const faqData = [
  {
    question: "¿Mis invitados necesitan descargar alguna app?",
    answer: "No. La invitación es un enlace web seguro que se abre al instante en cualquier navegador de celular o computadora."
  },
  {
    question: "¿Cuánto tiempo estará en línea mi invitación?",
    answer: "Tu enlace estará activo y funcionando perfectamente desde el momento en que lo apruebes hasta 30 días después de tu evento."
  },
  {
    question: "¿Cómo funciona la confirmación de asistencia?",
    answer: "Incluimos un widget inteligente. Los invitados ingresan su nombre y número de acompañantes, y el sistema te envía un mensaje automático a tu WhatsApp para facilitar tu control."
  },
  {
    question: "¿Puedo limitar los pases para evitar invitados extra?",
    answer: "¡Sí! Contamos con tecnología de 'Pases Exclusivos'. Podemos generar enlaces personalizados (ej. un link para la Familia Pérez) que bloquean el formulario y muestran un pase estricto, indicando exactamente para cuántas personas es válido."
  },
  {
    question: "¿Puedo cambiar la música y los colores?",
    answer: "Absolutamente. Nuestros diseños son 100% personalizables. Adaptamos la tipografía, paleta de colores y música para que coincidan con la estética de tu evento."
  }
];

function App() {
  // --- LÓGICA DEL SMART NAVBAR ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const prevScrollY = useRef(0);

  // --- LÓGICA DEL ACORDEÓN (FAQ) ---
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > prevScrollY.current && currentScrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white font-sans flex flex-col text-black">
            
            {/* --- SMART NAVBAR RESPONSIVO (ESTRUCTURA FIJA) --- */}
            <nav 
              className={`w-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center border-b-2 border-black gap-4 md:gap-0 sticky top-0 bg-white z-50 transition-transform duration-500 ease-in-out ${
                isNavVisible ? 'translate-y-0' : '-translate-y-full'
              }`}
            >
              <a href="#inicio" className="flex items-center justify-center">
                 <img 
                     src={logoFiestapp} 
                      alt="Fiestapp Logo" 
                     className="h-8 md:h-10 w-auto object-contain" 
                    />
                </a>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <a href="#inicio" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50 transition-opacity">Inicio</a>
                <a href="#coleccion" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50 transition-opacity">Colección</a>
                <a href="#proceso" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50 transition-opacity">El Proceso</a>
                <a href="#inversion" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50 transition-opacity">Inversión</a>
                <a href="#contacto" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50 transition-opacity">Contacto</a>
              </div>
              <div className="text-black text-[10px] tracking-[0.4em] uppercase font-black hidden md:block">
                Digital Studio
              </div>
            </nav>

            {/* --- CABECERA --- */}
            <header id="inicio" className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 overflow-hidden scroll-mt-24">
              <h1 className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 font-black ml-[0.2em] sm:ml-[0.4em] md:ml-[0.6em] animate-fiestapp-entry">
                FIESTAPP
              </h1>
              <div className="w-16 h-[3px] bg-black mb-6 md:mb-8 animate-fiestapp-entry [animation-delay:200ms]"></div>
              <p className="text-black italic text-lg md:text-2xl tracking-widest font-black animate-fiestapp-entry [animation-delay:400ms]">
                Invitaciones Digitales Premium
              </p>
            </header>

            {/* --- SECCIÓN 1: COLECCIÓN --- */}
            <main id="coleccion" className="w-full max-w-6xl mx-auto px-6 pb-20 scroll-mt-24">
              <div className="flex flex-col md:flex-row items-stretch justify-center border-t-2 border-black pt-12 md:pt-16 gap-10 md:gap-0">
                
                {/* TARJETA BODA */}
                <Link to="/boda-elegante-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4 animate-fiestapp-entry [animation-delay:600ms]">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">Boda Elegante</h2>
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-[0_45px_70px_-12px_rgba(0,0,0,0.6)]">
                      <video className="w-full h-auto object-cover" autoPlay loop muted playsInline >
                        <source src="/videos/boda_demo.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-black text-xs font-bold mb-8 leading-relaxed px-2">Un diseño clásico, tipografía Serif y un tono premium.</p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">Ver Demo Full</div>
                </Link>

                <div className="hidden md:block w-[2px] bg-black mx-4 lg:mx-8"></div>
                <div className="md:hidden w-16 h-[2px] bg-black mx-auto"></div>

                {/* TARJETA XV AÑOS */}
                <Link to="/xv-glamour-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4 animate-fiestapp-entry [animation-delay:800ms]">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">XV Años Glamour</h2>
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-[0_45px_70px_-12px_rgba(0,0,0,0.6)]">
                      <video className="w-full h-auto object-cover" autoPlay loop muted playsInline >
                        <source src="/videos/xv_demo.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-black text-xs font-bold mb-8 leading-relaxed px-2">Vibrante, con gradientes dorados y un toque moderno.</p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">Ver Demo Full</div>
                </Link>

                <div className="hidden md:block w-[2px] bg-black mx-4 lg:mx-8"></div>
                <div className="md:hidden w-16 h-[2px] bg-black mx-auto"></div>

                {/* TARJETA NIÑOS */}
                <Link to="/bautizo-infantil-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4 animate-fiestapp-entry [animation-delay:1000ms]">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">Bautizo y Niños</h2>
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-[0_45px_70px_-12px_rgba(0,0,0,0.6)]">
                      <video className="w-full h-auto object-cover" autoPlay loop muted playsInline >
                        <source src="/videos/kids_demo.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-black text-xs font-bold mb-8 leading-relaxed px-2">Divertido, con colores pastel y tipografía amigable.</p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">Ver Demo Full</div>
                </Link>

              </div>
            </main>

            {/* --- SECCIÓN 2: EL PROCESO --- */}
            <section id="proceso" className="w-full max-w-6xl mx-auto px-6 py-20 border-t-2 border-black scroll-mt-24 animate-fiestapp-entry">
              <h2 className="text-2xl md:text-4xl uppercase tracking-[0.4em] font-black text-center mb-16">El Proceso</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
                
                <div className="flex flex-col items-center group">
                  <div className="text-6xl md:text-8xl font-black text-stone-200 group-hover:text-black transition-colors duration-500 mb-6">01</div>
                  <h3 className="text-sm tracking-[0.3em] uppercase font-black mb-4">Selección</h3>
                  <p className="text-xs font-bold text-stone-500 leading-relaxed max-w-xs">Elige la estética de nuestra colección que mejor se adapte a tu evento.</p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="text-6xl md:text-8xl font-black text-stone-200 group-hover:text-black transition-colors duration-500 mb-6">02</div>
                  <h3 className="text-sm tracking-[0.3em] uppercase font-black mb-4">Personalización</h3>
                  <p className="text-xs font-bold text-stone-500 leading-relaxed max-w-xs">Envíanos tus fotos, música, locaciones y textos. Nosotros maquetamos todo.</p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="text-6xl md:text-8xl font-black text-stone-200 group-hover:text-black transition-colors duration-500 mb-6">03</div>
                  <h3 className="text-sm tracking-[0.3em] uppercase font-black mb-4">Lanzamiento</h3>
                  <p className="text-xs font-bold text-stone-500 leading-relaxed max-w-xs">Recibe tu link privado, revísalo y compártelo con todos tus invitados por WhatsApp.</p>
                </div>

              </div>
            </section>

            {/* --- SECCIÓN 3: INVERSIÓN --- */}
            <section id="inversion" className="w-full max-w-6xl mx-auto px-6 py-20 border-t-2 border-black scroll-mt-24 animate-fiestapp-entry">
              <h2 className="text-2xl md:text-4xl uppercase tracking-[0.4em] font-black text-center mb-16">Inversión</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                <div className="border-2 border-black p-10 flex flex-col items-center text-center hover:bg-black hover:text-white transition-colors duration-500 group">
                  <h3 className="text-lg tracking-[0.4em] uppercase font-black mb-2">Esencial</h3>
                  <p className="text-xs font-bold text-stone-400 mb-8 uppercase tracking-widest group-hover:text-stone-300">Diseño Minimalista</p>
                  <div className="w-8 h-[2px] bg-black group-hover:bg-white mb-10 transition-colors"></div>
                  
                  <ul className="text-xs font-bold space-y-4 mb-12 flex-1">
                    <li>Tipografías Premium</li>
                    <li>Cuenta Regresiva</li>
                    <li>Mesa de Regalos</li>
                    <li>Botones de Ubicación GPS</li>
                    <li>Confirmación por WhatsApp</li>
                  </ul>
                  
                  <a href="https://wa.me/524622350418?text=Hola,%20me%20interesa%20el%20Paquete%20Esencial" target="_blank" rel="noreferrer" className="w-full border-2 border-black text-black px-8 py-4 text-[10px] tracking-widest uppercase font-black group-hover:border-white group-hover:text-white transition-colors">
                    Solicitar Paquete
                  </a>
                </div>

                <div className="border-2 border-black bg-black text-white p-10 flex flex-col items-center text-center">
                  <h3 className="text-lg tracking-[0.4em] uppercase font-black mb-2 text-amber-300">Premium</h3>
                  <p className="text-xs font-bold text-stone-400 mb-8 uppercase tracking-widest">La Experiencia Completa</p>
                  <div className="w-8 h-[2px] bg-amber-300 mb-10"></div>
                  
                  <ul className="text-xs font-bold space-y-4 mb-12 flex-1">
                    <li>Todo lo del Paquete Esencial</li>
                    <li className="text-amber-300">Pases VIP (Anti-Colados)</li>
                    <li className="text-amber-300">Carrusel de Fotografías</li>
                    <li className="text-amber-300">Música de Fondo Automática</li>
                    <li className="text-amber-300">Itinerario Interactivo</li>
                  </ul>
                  
                  <a href="https://wa.me/524622350418?text=Hola,%20me%20interesa%20el%20Paquete%20Premium" target="_blank" rel="noreferrer" className="w-full bg-amber-300 text-black px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-white transition-colors">
                    Solicitar Paquete
                  </a>
                </div>

              </div>
            </section>

            {/* --- SECCIÓN 3.5: PREGUNTAS FRECUENTES (FAQ) --- */}
            <section className="w-full max-w-4xl mx-auto px-6 py-20 border-t-2 border-black animate-fiestapp-entry">
              <h2 className="text-2xl md:text-4xl uppercase tracking-[0.4em] font-black text-center mb-16">Dudas Comunes</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border-2 border-black group cursor-pointer transition-colors duration-300" 
                    onClick={() => toggleFaq(index)}
                  >
                    <div className={`p-6 flex justify-between items-center transition-colors duration-300 ${
                      openFaqIndex === index ? 'bg-black text-white' : 'bg-white text-black group-hover:bg-stone-100'
                    }`}>
                      <h3 className="text-xs md:text-sm tracking-widest uppercase font-black pr-4 leading-relaxed">{faq.question}</h3>
                      <span className="text-2xl font-light">{openFaqIndex === index ? '−' : '+'}</span>
                    </div>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openFaqIndex === index ? 'max-h-40 border-t-2 border-black' : 'max-h-0'
                      }`}
                    >
                      <p className="p-6 text-xs md:text-sm font-bold text-stone-600 leading-relaxed bg-white">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- SECCIÓN 4: CONTACTO (ACTUALIZADO CON CORREO) --- */}
            <section id="contacto" className="w-full max-w-6xl mx-auto px-6 pb-24 scroll-mt-24 animate-fiestapp-entry">
              <div className="bg-black text-white py-16 px-8 md:px-20 text-center flex flex-col items-center shadow-2xl">
                <h3 className="text-2xl md:text-4xl uppercase tracking-[0.3em] font-black mb-6">
                  100% Personalizable
                </h3>
                <div className="w-16 h-[2px] bg-white mb-8"></div>
                <p className="text-sm md:text-lg font-bold tracking-widest leading-relaxed max-w-3xl uppercase">
                  Los diseños mostrados arriba son únicamente demostraciones de nuestro trabajo. <br className="hidden md:block mt-2"/>
                  Cada evento es único, por lo que adaptamos colores, tipografías, música, fotografías y secciones a tu gusto. <br className="hidden md:block mt-2"/>
                  <span className="text-stone-400 mt-4 block">Si lo puedes imaginar, lo podemos programar.</span>
                </p>
                
                <a href="https://wa.me/524622350418?text=Hola,%20me%20gustaría%20cotizar%20mi%20diseño%20de%20invitación" target="_blank" rel="noreferrer" className="mt-10 border-2 border-white text-white px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-white hover:text-black transition-colors duration-300">
                  Contactar Asesor
                </a>

                {/* NUEVO CORREO CORPORATIVO */}
                <p className="mt-8 text-stone-400 text-[10px] md:text-xs tracking-widest uppercase font-bold">
                  o escríbenos a <br className="md:hidden" />
                  <a href="mailto:contacto@fiestapp.com.mx" className="text-white hover:text-stone-300 transition-colors ml-0 md:ml-2">contacto@fiestapp.com.mx</a>
                </p>
              </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="pb-12 text-center px-4">
              <p className="text-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase font-black mb-4">
                Pure Design for Memorable Events
              </p>
              <div className="w-8 h-[1px] bg-stone-300 mx-auto mb-4"></div>
              <p className="text-stone-500 text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold">
                &copy; {new Date().getFullYear()} Fiestapp Digital Studio. Todos los derechos reservados.
              </p>
            </footer>

    {/* --- INICIO SECCIÓN REDES SOCIALES --- */}
    <div className="flex justify-center items-center space-x-6 py-8 mt-12 border-t border-gray-200">
  
  {/* Enlace a Instagram */}
  <a 
    href="https://www.instagram.com/fiestappds/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-black transition-colors duration-300"
  >
    <span className="sr-only">Instagram</span>
    {/* Ícono de Instagram en SVG */}
    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  </a>

  {/* Enlace a Facebook */}
  <a 
    href="https://www.facebook.com/profile.php?id=61577438272854" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-black transition-colors duration-300"
  >
    <span className="sr-only">Facebook</span>
    {/* Ícono de Facebook en SVG */}
    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  </a>

</div>
{/* --- FIN SECCIÓN REDES SOCIALES --- */}

          </div>
        } />

        {/* --- RUTAS SECUNDARIAS --- */}
        <Route path="/boda-elegante-demo" element={<BodaLayout />} />
        <Route path="/xv-glamour-demo" element={<XVLayout />} />
        <Route path="/bautizo-infantil-demo" element={<KidsLayout />} />
      </Routes>
    </Router>
  );
}

export default App;