import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BodaLayout from './layouts/BodaLayout';
import XVLayout from './layouts/XVLayout';
import KidsLayout from './layouts/KidsLayout';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import ScrollToTop from './components/ScrollToTop';


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* --- PÁGINA DE INICIO: SHOWROOM DE PORTAFOLIO --- */}
        <Route path="/" element={
          <div className="min-h-screen bg-stone-50 font-serif">
            {/* HEADER CON TÍTULO BIEN MARCADO */}
            <header className="py-20 text-center bg-white shadow-sm border-b border-stone-200">
              {/* CAMBIO AQUÍ: Color sólido y peso extra negrita */}
              <h1 className="text-6xl font-black mb-4" style={{ color: '#1c1917', opacity: '1', display: 'block' }}>
                Fiestapp.lat
              </h1>
              {/* CAMBIO AQUÍ: Color gris oscuro para el subtítulo */}
              <p className="text-2xl text-stone-600 max-w-2xl mx-auto px-6 italic">
                Invitaciones Digitales Premium
              </p>
              <p className="text-stone-400 mt-2 uppercase tracking-[0.3em] text-xs">
                Irapuato
              </p>
            </header>
            
            <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* CARD BODA */}
              <Link to="/boda-elegante-demo" className="group block bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-stone-100">
                <span className="text-6xl block mb-6 drop-shadow-sm">💍</span>
                <h3 className="text-2xl font-bold mb-3 text-stone-800 uppercase tracking-widest">Boda Elegante</h3>
                <p className="text-stone-500 leading-relaxed mb-8 h-12">Un diseño clásico, tipografía Serif y un tono premium.</p>
                <div className="mt-6 border-t border-stone-50 pt-6">
                  <span className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] group-hover:bg-stone-700 transition-colors uppercase">
                    Ver Demo
                  </span>
                </div>
              </Link>
              
              {/* CARD XV AÑOS */}
              <Link to="/xv-glamour-demo" className="group block bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-stone-100">
                <span className="text-6xl block mb-6 drop-shadow-sm">✨</span>
                <h3 className="text-2xl font-bold mb-3 text-stone-800 uppercase tracking-widest">XV Años Glamour</h3>
                <p className="text-stone-500 leading-relaxed mb-8 h-12">Vibrante, con gradientes dorados y un toque moderno.</p>
                <div className="mt-6 border-t border-stone-50 pt-6">
                  <span className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] group-hover:bg-stone-700 transition-colors uppercase">
                    Ver Demo
                  </span>
                </div>
              </Link>

              {/* CARD BAUTIZO / NIÑOS */}
              <Link to="/bautizo-infantil-demo" className="group block bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-stone-100">
                <span className="text-6xl block mb-6 drop-shadow-sm">🎈</span>
                <h3 className="text-2xl font-bold mb-3 text-stone-800 uppercase tracking-widest">Bautizo y Niños</h3>
                <p className="text-stone-500 leading-relaxed mb-8 h-12">Divertido, con colores pastel y tipografía amigable.</p>
                <div className="mt-6 border-t border-stone-50 pt-6">
                  <span className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] group-hover:bg-stone-700 transition-colors uppercase">
                    Ver Demo
                  </span>
                </div>
              </Link>

            </main>

            <footer className="text-center pb-12 text-stone-400 text-sm tracking-widest uppercase">
              © 2026 Fiestapp • Irapuato, Gto.
            </footer>
          </div>
        } />

        {/* --- RUTAS DE LOS LAYOUTS --- */}
        <Route path="/boda-elegante-demo" element={<BodaLayout />} />
        <Route path="/xv-glamour-demo" element={<XVLayout />} />
        <Route path="/bautizo-infantil-demo" element={<KidsLayout />} />
        
        {/* RUTA 404 */}
        <Route path="*" element={
          <div className="h-screen flex flex-col items-center justify-center font-serif bg-stone-50 text-stone-900">
            <h2 className="text-4xl mb-4">404</h2>
            <p className="mb-8 italic text-stone-500">Página no encontrada</p>
            <Link to="/" className="bg-stone-900 text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest">Volver al inicio</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;