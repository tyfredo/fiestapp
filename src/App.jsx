import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BodaLayout from './layouts/BodaLayout';
import XVLayout from './layouts/XVLayout';
import KidsLayout from './layouts/KidsLayout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // --- LÓGICA DEL SMART NAVBAR (INTACTA) ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const prevScrollY = useRef(0);

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
              <div className="text-black text-[10px] tracking-[0.4em] uppercase font-black">
                Est. 2026
              </div>
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

            {/* --- CABECERA (ANIMACIÓN DE ENTRADA SUAVE 1 y 2) --- */}
            <header id="inicio" className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 overflow-hidden scroll-mt-24">
              <h1 className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 font-black ml-[0.2em] sm:ml-[0.4em] md:ml-[0.6em] animate-fiestapp-entry">
                FIESTAPP
              </h1>
              <div className="w-16 h-[3px] bg-black mb-6 md:mb-8 animate-fiestapp-entry [animation-delay:200ms]"></div>
              <p className="text-black italic text-lg md:text-2xl tracking-widest font-black animate-fiestapp-entry [animation-delay:400ms]">
                Invitaciones Digitales Premium
              </p>
            </header>

            {/* --- SECCIÓN 1: COLECCIÓN ( ANIMACIÓN 3: CARDS SECUENCIALES & SOMBRAS DE IPHONE) --- */}
            <main id="coleccion" className="w-full max-w-6xl mx-auto px-6 pb-20 scroll-mt-24">
              <div className="flex flex-col md:flex-row items-stretch justify-center border-t-2 border-black pt-12 md:pt-16 gap-10 md:gap-0">
                
                {/* TARJETA BODA */}
                <Link to="/boda-elegante-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4 animate-fiestapp-entry [animation-delay:600ms]">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">Boda Elegante</h2>
                    {/* SOMBRAS DE IPHONE OPTIMIZADAS: Custom Elevation Shadow + Smooth Transition */}
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
                    {/* SOMBRAS DE IPHONE */}
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
                    {/* SOMBRAS DE IPHONE */}
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

            {/* --- SECCIÓN 2: EL PROCESO ( ANIMACIÓN 4: ENTRADA DE SECCIÓN) --- */}
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

            {/* --- SECCIÓN 3: INVERSIÓN ( ANIMACIÓN 5: ENTRADA DE SECCIÓN) --- */}
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
                  
                  {/* WHATSAPP FIJO: 524622350418 */}
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
                    <li className="text-amber-300">Animaciones de Entrada</li>
                    <li className="text-amber-300">Carrusel de Fotografías</li>
                    <li className="text-amber-300">Música de Fondo Automática</li>
                    <li className="text-amber-300">Itinerario Interactivo</li>
                  </ul>
                  
                  {/* WHATSAPP FIJO: 524622350418 */}
                  <a href="https://wa.me/524622350418?text=Hola,%20me%20interesa%20el%20Paquete%20Premium" target="_blank" rel="noreferrer" className="w-full bg-amber-300 text-black px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-white transition-colors">
                    Solicitar Paquete
                  </a>
                </div>

              </div>
            </section>

            {/* --- SECCIÓN 4: CONTACTO ( ANIMACIÓN 6: ENTRADA DE SECCIÓN) --- */}
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
                
                {/* WHATSAPP FIJO: 524622350418 */}
                <a href="https://wa.me/524622350418" target="_blank" rel="noreferrer" className="mt-10 border-2 border-white text-white px-8 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-white hover:text-black transition-colors duration-300">
                  Contactar Asesor
                </a>
              </div>
            </section>

            {/* --- FOOTER (INTACTO, SIN UBICACIONES) --- */}
            <footer className="pb-12 text-center px-4">
              <p className="text-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase font-black">
                Pure Design for Memorable Events
              </p>
            </footer>

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