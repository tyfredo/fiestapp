import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

import floresArriba from '../assets/flor-arriba.png'; 
import floresAbajo from '../assets/flor-abajo.png';
import fondoPapel from '../assets/textura-papel.jpg'; 

// --- COMPONENTE DE ANIMACIÓN AL HACER SCROLL ---
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current) };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const RenataXVLayout = () => {
  const fechaEvento = "2026-07-18T13:00:00"; 

  return (
    <div className="min-h-screen text-stone-800 font-serif overflow-x-hidden relative">
      
      {/* ESTILOS DE ANIMACIÓN PARA LA PORTADA */}
      <style>{`
        @keyframes slideDownFlower {
          0% { transform: translate(-50%, -80px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 0.9; }
        }
        @keyframes slideUpFlower {
          0% { transform: translate(-50%, 80px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 0.9; }
        }
        @keyframes fadeInText {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-flower-top { animation: slideDownFlower 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .anim-flower-bottom { animation: slideUpFlower 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .anim-text-center { animation: fadeInText 2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }
      `}</style>

      {/* 1. PORTADA */}
      <section className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden">
        
        {/* FONDO */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fondoPapel})`, backgroundColor: '#F9F6F0' }}
        >
          <div className="absolute inset-0 bg-botanical-parchment/60"></div>
        </div>

        {/* FLORES ANIMADAS */}
        <img 
          src={floresArriba} 
          alt="Flores superiores" 
          className="anim-flower-top absolute top-0 left-1/2 w-[120%] md:w-full max-w-2xl z-10 pointer-events-none" 
        />
        
        <img 
          src={floresAbajo} 
          alt="Flores inferiores" 
          className="anim-flower-bottom absolute bottom-0 left-1/2 w-[120%] md:w-full max-w-2xl z-10 pointer-events-none" 
        />

        {/* TEXTO CENTRAL ANIMADO (Ajustado para no chocar con las flores) */}
        <div className="anim-text-center relative z-20 w-full max-w-2xl flex flex-col items-center text-center drop-shadow-sm -mt-8 md:mt-0">
          
          <p className="text-botanical-thicket tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-2">
            Mis XV Años
          </p>

          {/* Margen inferior reducido de mb-10 a mb-2 para subir la fecha */}
          <h1 className="text-[120px] md:text-[160px] leading-none mb-2 text-botanical-berry font-script drop-shadow-sm">
            Renata
          </h1>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-botanical-thicket">Sábado</p>
              <div className="h-[1px] w-8 md:w-16 bg-botanical-grass"></div>
              <p className="text-5xl md:text-7xl font-serif text-stone-800 font-light">18</p>
              <div className="h-[1px] w-8 md:w-16 bg-botanical-grass"></div>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-botanical-thicket">Julio</p>
            </div>

            {/* Margen superior reducido de mt-6 a mt-3 para subir el año */}
            <p className="text-stone-500 tracking-[0.5em] mt-3 text-sm md:text-base font-light">
              2026
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE PADRES Y PADRINOS */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto relative z-10">
        <FadeInSection>
          <h3 className="text-3xl text-botanical-berry mb-12 italic font-light">En compañía de mis padres</h3>
          <div className="space-y-2 text-xl text-stone-700 font-serif">
            <p>Francisco Hernández</p>
            <p>Mayela Ornelas</p>
          </div>

          <div className="my-16 flex justify-center">
            <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
            <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
            <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
          </div>

          <h3 className="text-2xl text-botanical-sky mb-8 italic font-light">Y mis padrinos</h3>
          <p className="text-lg text-stone-600 font-serif">Arturo Ornelas y Susana Ornelas</p>
        </FadeInSection>
      </section>

      {/* 3. CUENTA REGRESIVA */}
      <section className="py-20 text-center border-y border-botanical-grass/20 bg-white/30 backdrop-blur-sm relative z-10">
        <FadeInSection>
          <h3 className="text-botanical-thicket text-xs mb-8 uppercase tracking-[0.4em] font-bold">Faltan:</h3>
          <div className="text-4xl md:text-5xl text-botanical-berry">
             <Countdown targetDate={fechaEvento} />
          </div>
        </FadeInSection>
      </section>

      {/* 4. ITINERARIO */}
      <section className="py-24 px-6 max-w-2xl mx-auto relative z-10">
        <FadeInSection>
          <h3 className="text-4xl text-botanical-berry mb-16 text-center italic font-light">Itinerario</h3>
          
          <div className="space-y-10 border-l border-botanical-grass ml-4 md:mx-auto md:w-fit md:pr-12">
            
            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1 w-3 h-3 bg-botanical-grass rounded-full"></div>
              <p className="text-botanical-thicket font-bold tracking-widest text-sm mb-1">14:30 HRS</p>
              <h4 className="text-2xl text-stone-800 mb-2">Recepción</h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1 w-3 h-3 bg-botanical-grass rounded-full"></div>
              <p className="text-botanical-thicket font-bold tracking-widest text-sm mb-1">15:30 HRS</p>
              <h4 className="text-2xl text-stone-800 mb-2">Comida</h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1 w-3 h-3 bg-botanical-grass rounded-full"></div>
              <p className="text-botanical-thicket font-bold tracking-widest text-sm mb-1">17:30 HRS</p>
              <h4 className="text-2xl text-stone-800 mb-2">Vals</h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[7px] top-1 w-3 h-3 bg-botanical-grass rounded-full"></div>
              <p className="text-botanical-thicket font-bold tracking-widest text-sm mb-1">18:00 HRS</p>
              <h4 className="text-2xl text-stone-800 mb-2">Música y Baile</h4>
            </div>

          </div>
        </FadeInSection>
      </section>

      {/* 5. LOCACIONES Y DETALLES */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        <FadeInSection delay={0}>
          <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-3xl text-botanical-berry mb-6 italic">Ceremonia</h4>
              <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">13:00 HRS</p>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Templo del Señor de la Misericordia<br/>
                Prolongación Guerrero #3009<br/>
                Fracc. Las Plazas
              </p>
            </div>
            <MapButton 
              location="" 
              label="Ver Ubicación" 
              className="bg-botanical-sky hover:bg-botanical-berry transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto" 
            />
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-3xl text-botanical-berry mb-6 italic">Recepción</h4>
              <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">14:30 HRS</p>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Jardín Alvori
              </p>
            </div>
            <MapButton 
              location="" 
              label="Ver Ubicación" 
              className="bg-botanical-sky hover:bg-botanical-berry transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto" 
            />
          </div>
        </FadeInSection>
      </section>

      {/* 6. CÓDIGO DE VESTIMENTA Y CONFIRMACIÓN */}
      <section className="py-24 px-6 text-center bg-botanical-grass/10 border-y border-botanical-grass/20 relative z-10">
        <FadeInSection>
          <h3 className="text-3xl text-botanical-berry mb-4 italic font-light">Código de Vestimenta</h3>
          <p className="text-xl text-stone-800 mb-12 tracking-widest uppercase font-bold">Elegant Sport</p>

          <div className="w-16 h-[1px] bg-botanical-grass mx-auto mb-12"></div>

          <h3 className="text-2xl text-botanical-sky mb-4 italic font-light">Confirmación de Asistencia</h3>
          <p className="text-stone-600 mb-6 font-serif">
            Favor de confirmar asistencia antes del<br/>
            <span className="font-bold text-stone-800 text-lg">8 de Julio</span>
          </p>
        </FadeInSection>
      </section>

      {/* BOTÓN FLOTANTE RSVP */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="524622105919" eventName="XV de Renata" />
      </div>

    </div>
  );
};

export default RenataXVLayout;