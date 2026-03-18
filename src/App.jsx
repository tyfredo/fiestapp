import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BodaLayout from './layouts/BodaLayout';
import XVLayout from './layouts/XVLayout';
import KidsLayout from './layouts/KidsLayout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white font-sans flex flex-col text-black">
            
            {/* --- NAVBAR RESPONSIVO (INTACTO) --- */}
            <nav className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center border-b-2 border-black gap-4 md:gap-0">
              <div className="text-black text-[10px] tracking-[0.4em] uppercase font-black">
                Est. 2026
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <Link to="/" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50">Inicio</Link>
                <a href="#" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50">Portafolio</a>
                <a href="#" className="text-black text-[10px] tracking-[0.3em] uppercase font-black hover:opacity-50">Contacto</a>
              </div>
              <div className="text-black text-[10px] tracking-[0.4em] uppercase font-black hidden md:block">
                Salamanca • México
              </div>
            </nav>

            {/* --- CABECERA (INTACTA) --- */}
            <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 overflow-hidden">
              <h1 className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 font-black ml-[0.2em] sm:ml-[0.4em] md:ml-[0.6em]">
                FIESTAPP
              </h1>
              <div className="w-16 h-[3px] bg-black mb-6 md:mb-8"></div>
              <p className="text-black italic text-lg md:text-2xl tracking-widest font-black">
                Invitaciones Digitales Premium
              </p>
            </header>

            {/* --- MENÚ DE INVITACIONES CON VIDEOS REDONDEADOS --- */}
            <main className="w-full max-w-6xl mx-auto px-6 pb-24">
              <div className="flex flex-col md:flex-row items-stretch justify-center border-t-2 border-black pt-12 md:pt-16 gap-10 md:gap-0">
                
                {/* --- TARJETA BODA --- */}
                <Link to="/boda-elegante-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">
                      Boda Elegante
                    </h2>
                    
                    {/* CONTENEDOR DE VIDEO: Redondeado con overflow-hidden */}
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <video 
                        className="w-full h-auto object-cover"
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      >
                        <source src="/videos/boda_demo.mp4" type="video/mp4" />
                      </video>
                    </div>

                    <p className="text-black text-xs font-bold mb-8 leading-relaxed">
                      Un diseño clásico, tipografía Serif y un tono premium.
                    </p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">
                    Ver Demo Full
                  </div>
                </Link>

                <div className="hidden md:block w-[2px] bg-black mx-4 lg:mx-8"></div>
                <div className="md:hidden w-16 h-[2px] bg-black mx-auto"></div>

                {/* --- TARJETA XV AÑOS --- */}
                <Link to="/xv-glamour-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">
                      XV Años Glamour
                    </h2>
                    
                    {/* CONTENEDOR DE VIDEO */}
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <video 
                        className="w-full h-auto object-cover" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      >
                        <source src="/videos/xv_demo.mp4" type="video/mp4" />
                      </video>
                    </div>

                    <p className="text-black text-xs font-bold mb-8 leading-relaxed">
                      Vibrante, con gradientes dorados y un toque moderno.
                    </p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">
                    Ver Demo Full
                  </div>
                </Link>

                <div className="hidden md:block w-[2px] bg-black mx-4 lg:mx-8"></div>
                <div className="md:hidden w-16 h-[2px] bg-black mx-auto"></div>

                {/* --- TARJETA NIÑOS --- */}
                <Link to="/bautizo-infantil-demo" className="flex-1 text-center group flex flex-col items-center justify-between py-4 px-4">
                  <div className="w-full">
                    <h2 className="text-black text-sm md:text-base tracking-[0.4em] uppercase font-black mb-6">
                      Bautizo y Niños
                    </h2>
                    
                    {/* CONTENEDOR DE VIDEO */}
                    <div className="w-full max-w-[240px] mx-auto mb-8 rounded-[36px] overflow-hidden drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <video 
                        className="w-full h-auto object-cover" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      >
                        <source src="/videos/kids_demo.mp4" type="video/mp4" />
                      </video>
                    </div>

                    <p className="text-black text-xs font-bold mb-8 leading-relaxed">
                      Divertido, con colores pastel y tipografía amigable.
                    </p>
                  </div>
                  <div className="border-2 border-black text-black px-8 py-3 text-[10px] tracking-widest uppercase font-black transition-colors duration-300 group-hover:bg-black group-hover:text-white mt-auto">
                    Ver Demo Full
                  </div>
                </Link>

              </div>
            </main>

            <footer className="pb-12 text-center px-4">
              <p className="text-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase font-black">
                Pure Design for Memorable Events
              </p>
            </footer>
          </div>
        } />

        <Route path="/boda-elegante-demo" element={<BodaLayout />} />
        <Route path="/xv-glamour-demo" element={<XVLayout />} />
        <Route path="/bautizo-infantil-demo" element={<KidsLayout />} />
      </Routes>
    </Router>
  );
}

export default App;