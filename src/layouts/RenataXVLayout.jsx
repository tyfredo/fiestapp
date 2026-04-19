import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

import floresArriba from '../assets/flor-arriba.png'; 
import floresAbajo from '../assets/flor-abajo.png';
import fondoPapel from '../assets/textura-papel.png'; 
import selloCera from '../assets/sello-cera.png'; 
import logoFiestapp from '../assets/logo.png'; 

// IMPORTAMOS SOLO LAS MAGNOLIAS DE LAS ESQUINAS
import man3 from '../assets/man3.png'; 
import man6 from '../assets/man6.png'; 

// IMPORTAMOS EL SAKURA PARA LOS PAPAS
import sakuraPapas from '../assets/sakura-papas.png';

// IMPORTAMOS LOS ICONOS DEL ITINERARIO
import sakIcon from '../assets/sak-icon.png';
import iglesiaIcon from '../assets/iglesia-icon.png';
import recepcionIcon from '../assets/recepcion-icon.png';
import comidaIcon from '../assets/comida-icon.png';
import valsIcon from '../assets/vals-icon.png';
import musicaIcon from '../assets/musica-icon.png';

// IMPORTAMOS LOS ICONOS PARA LAS TARJETAS DE LOCACIÓN
import iglesiaCardIcon from '../assets/iglesia-icon-card.png';
import recepcionCardIcon from '../assets/recepcion-icon-card.png';

// IMPORTAMOS EL ICONO PARA EL CÓDIGO DE VESTIMENTA
import dressCodeIcon from '../assets/dress-code-icon.png';

// --- COMPONENTE DE ANIMACIÓN REPARADO (Caja contenedora fija) ---
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } 
    );
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => { 
      if (domRef.current) observer.unobserve(domRef.current); 
    };
  }, []);

  return (
    <div ref={domRef} className="w-full h-full">
      <div
        className={`w-full h-full transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const RenataXVLayout = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  
  const [scrollY, setScrollY] = useState(0);

  const fechaEvento = "2026-07-18T13:00:00"; 

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setHideEnvelope(true);
    }, 1500); 
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    if (isEnvelopeOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnvelopeOpen]);

  return (
    <div className="min-h-screen text-stone-800 font-serif overflow-x-hidden relative bg-[#F9F6F0]">
      
      {/* =========================================
          EL SOBRE (TELÓN OPACO)
          ========================================= */}
      {!hideEnvelope && (
        <div 
          onClick={handleOpenEnvelope}
          className={`fixed top-0 left-0 w-full h-[100dvh] z-[999] flex flex-col items-center justify-center bg-[#F9F6F0] cursor-pointer transition-transform duration-[1200ms] ease-in-out ${
            isEnvelopeOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{ 
            backgroundImage: `url(${fondoPapel})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          <div className="absolute inset-0 bg-stone-900/10"></div>
          
          <div className="relative z-10 flex flex-col items-center group">
            <div className={`w-32 h-32 flex items-center justify-center mb-6 transition-all duration-700 ${
              isEnvelopeOpen ? 'scale-150 opacity-0' : 'group-hover:scale-110'
            }`}>
              <img 
                src={selloCera} 
                alt="Sello de Cera" 
                className="w-full h-full object-contain" 
              />
            </div>
            
            <p className={`text-[#B9AF5F] tracking-[0.4em] uppercase text-xs font-bold animate-pulse transition-opacity duration-300 ${
              isEnvelopeOpen ? 'opacity-0' : 'opacity-100'
            }`}>
              Toca para abrir
            </p>
          </div>
        </div>
      )}

      {/* =========================================
          1. PORTADA CON ANIMACIÓN DE SALIDA
          ========================================= */}
      <section className="relative min-h-[90dvh] md:min-h-screen overflow-hidden">
        
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fondoPapel})` }}
        >
          <div className="absolute inset-0 bg-[#F9F6F0]/60"></div>
        </div>

        <div 
          className="absolute inset-0 flex items-center justify-center p-4 md:p-10"
          style={{
            transform: `translateY(${scrollY * 0.35}px)`,
            opacity: Math.max(1 - scrollY / 400, 0), 
          }}
        >
          <img 
            src={floresArriba} 
            alt="Flores superiores" 
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[115%] md:w-full max-w-3xl z-10 pointer-events-none transition-all duration-[1500ms] ease-out ${
              isEnvelopeOpen ? 'translate-y-0 opacity-100 delay-300' : '-translate-y-24 opacity-0'
            }`} 
          />
          
          <img 
            src={floresAbajo} 
            alt="Flores inferiores" 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] md:w-full max-w-3xl z-10 pointer-events-none transition-all duration-[1500ms] ease-out ${
              isEnvelopeOpen ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-24 opacity-0'
            }`} 
          />

          <div className={`relative z-20 w-full max-w-2xl flex flex-col items-center text-center drop-shadow-sm -mt-8 md:mt-0 transition-all duration-[1500ms] ease-out ${
              isEnvelopeOpen ? 'opacity-100 scale-100 delay-700' : 'opacity-0 scale-90'
            }`}
          >
            <p className="text-botanical-thicket tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-2">
              Mis XV Años
            </p>

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

              <p className="text-stone-500 tracking-[0.5em] mt-3 text-sm md:text-base font-light">
                2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE PADRES Y PADRINOS */}
      <section className="py-24 px-6 relative z-10 bg-transparent">
        {/* SAKURA EN LA ESQUINA SUPERIOR IZQUIERDA */}
        <img 
          src={sakuraPapas} 
          alt="Sakura Decoración" 
          className="absolute top-0 left-0 -translate-x-8 md:-translate-x-12 -translate-y-8 md:-translate-y-12 w-64 md:w-[450px] opacity-90 pointer-events-none mix-blend-multiply" 
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <FadeInSection>
            <h3 className="text-3xl text-botanical-berry mb-12 italic font-light">En compañía de mis padres</h3>
            <div className="text-xl text-stone-700 font-serif">
              {/* NOMBRES EN UNA SOLA LÍNEA CON "Y" */}
              <p>Francisco Hernández Y Mayela Ornelas</p>
            </div>

            <div className="my-16 flex justify-center">
              <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
              <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
              <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
            </div>

            {/* MISMO TAMAÑO DE TEXTO (text-3xl) */}
            <h3 className="text-3xl text-botanical-sky mb-8 italic font-light">Y mis padrinos</h3>
            <p className="text-lg text-stone-600 font-serif">Arturo Ornelas y Susana Ornelas</p>
          </FadeInSection>
        </div>
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
      <section className="py-32 px-6 max-w-2xl mx-auto relative z-10 bg-transparent">
        <FadeInSection>
          <h3 className="text-5xl text-botanical-berry mb-16 text-center italic font-light drop-shadow-sm">Itinerario</h3>
          
          <div className="relative pt-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-botanical-berry/30"></div>
            
            <div className="flex flex-col items-center mb-16 relative z-10 bg-[#F9F6F0] py-2">
              <img src={sakIcon} alt="Sakura" className="w-12 md:w-16 mb-3 opacity-90" />
              <p className="text-botanical-berry tracking-[0.2em] text-xs md:text-sm font-bold uppercase">El Gran Día</p>
            </div>

            <div className="space-y-16 md:space-y-24">
              
              {/* Evento 1: Ceremonia */}
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-botanical-berry bg-[#F9F6F0] z-10"></div>
                <div className="w-1/2 pr-6 md:pr-10 text-right flex flex-col justify-center items-end">
                  <p className="text-botanical-berry font-bold tracking-widest text-lg md:text-xl font-sans uppercase">13:00</p>
                </div>
                <div className="w-1/2 pl-6 md:pl-10 text-left flex flex-col items-start">
                  <img src={iglesiaIcon} alt="Ceremonia" className="w-10 md:w-12 mb-3 opacity-80" />
                  <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Ceremonia</h4>
                </div>
              </div>

              {/* Evento 2: Recepción */}
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-botanical-berry bg-[#F9F6F0] z-10"></div>
                <div className="w-1/2 pr-6 md:pr-10 text-right flex flex-col items-end">
                  <img src={recepcionIcon} alt="Recepción" className="w-10 md:w-12 mb-3 opacity-80" />
                  <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Recepción</h4>
                </div>
                <div className="w-1/2 pl-6 md:pl-10 text-left flex flex-col justify-center items-start">
                  <p className="text-botanical-berry font-bold tracking-widest text-lg md:text-xl font-sans uppercase">14:30</p>
                </div>
              </div>

              {/* Evento 3: Comida */}
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-botanical-berry bg-[#F9F6F0] z-10"></div>
                <div className="w-1/2 pr-6 md:pr-10 text-right flex flex-col justify-center items-end">
                  <p className="text-botanical-berry font-bold tracking-widest text-lg md:text-xl font-sans uppercase">15:30</p>
                </div>
                <div className="w-1/2 pl-6 md:pl-10 text-left flex flex-col items-start">
                  <img src={comidaIcon} alt="Comida" className="w-10 md:w-12 mb-3 opacity-80" />
                  <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Comida</h4>
                </div>
              </div>

              {/* Evento 4: Vals */}
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-botanical-berry bg-[#F9F6F0] z-10"></div>
                <div className="w-1/2 pr-6 md:pr-10 text-right flex flex-col items-end">
                  <img src={valsIcon} alt="Vals" className="w-10 md:w-12 mb-3 opacity-80" />
                  <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Vals</h4>
                </div>
                <div className="w-1/2 pl-6 md:pl-10 text-left flex flex-col justify-center items-start">
                  <p className="text-botanical-berry font-bold tracking-widest text-lg md:text-xl font-sans uppercase">17:30</p>
                </div>
              </div>

              {/* Evento 5: Música y Baile */}
              <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-botanical-berry bg-[#F9F6F0] z-10"></div>
                <div className="w-1/2 pr-6 md:pr-10 text-right flex flex-col justify-center items-end">
                  <p className="text-botanical-berry font-bold tracking-widest text-lg md:text-xl font-sans uppercase">18:00</p>
                </div>
                <div className="w-1/2 pl-6 md:pl-10 text-left flex flex-col items-start">
                  <img src={musicaIcon} alt="Música y Baile" className="w-10 md:w-12 mb-3 opacity-80" />
                  <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Música<br/>y Baile</h4>
                </div>
              </div>

            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 5. LOCACIONES Y DETALLES */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10 bg-transparent">
        <FadeInSection delay={0}>
          <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80 h-full flex flex-col justify-between relative overflow-hidden">
            
            <img src={man3} alt="Decoración Magnolias" className="absolute top-0 right-0 w-24 md:w-32 opacity-60 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <img src={iglesiaCardIcon} alt="Icono Ceremonia" className="w-20 md:w-24 mb-6 opacity-80 mix-blend-multiply" />
              
              <h4 className="text-3xl text-botanical-berry mb-6 italic">Ceremonia</h4>
              <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">13:00 HRS</p>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Templo del Señor de la Misericordia<br/>
                Prolongación Guerrero #3009<br/>
                Fracc. Las Plazas
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <MapButton 
                location="https://maps.app.goo.gl/S4FRmRJyKVzL5baM7" 
                label="Ver Ubicación" 
                className="bg-botanical-sky hover:bg-botanical-berry transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto" 
              />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80 h-full flex flex-col justify-between relative overflow-hidden">
            
            <img src={man6} alt="Decoración Magnolias" className="absolute top-0 left-0 w-24 md:w-32 opacity-60 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <img src={recepcionCardIcon} alt="Icono Recepción" className="w-20 md:w-24 mb-6 opacity-80 mix-blend-multiply" />
              
              <h4 className="text-3xl text-botanical-berry mb-6 italic">Recepción</h4>
              <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">14:30 HRS</p>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Jardín Alvori <br /> Arq. Enrique del moral Domínguez, 36826  <br /> Irapuato, Gto.
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <MapButton 
                location="https://maps.app.goo.gl/BMCXJypVH3aHJCcP9" 
                label="Ver Ubicación" 
                className="bg-botanical-sky hover:bg-botanical-berry transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto" 
              />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 6. CÓDIGO DE VESTIMENTA Y CONFIRMACIÓN */}
      <section className="py-24 px-6 text-center bg-botanical-grass/10 border-y border-botanical-grass/20 relative z-10 pb-32">
        <FadeInSection>
          <div className="flex flex-col items-center mb-6">
            <img src={dressCodeIcon} alt="Icono Código de Vestimenta" className="w-32 md:w-48 opacity-80 mix-blend-multiply" />
          </div>

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

      {/* FOOTER DE MARCA (FIESTAPP SIGNATURE) */}
      <footer className="w-full pt-12 pb-32 -mt-20 bg-[#F9F6F0] border-t border-botanical-grass/10 z-10 relative">
        <a href="/" target="_self" className="flex flex-col items-center justify-center group">
          <img 
            src={logoFiestapp} 
            alt="Fiestapp Logo" 
            className="h-6 mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" 
          />
          <p className="text-[10px] md:text-xs text-botanical-thicket font-serif tracking-[0.4em] uppercase font-bold group-hover:text-botanical-berry transition-colors text-center px-4">
            Crea tu propia invitación inolvidable
          </p>
          <p className="text-[9px] text-stone-400 mt-1">
            Una experiencia digital de Fiestapp ❤️
          </p>
        </a>
      </footer>

      {/* BOTÓN FLOTANTE RSVP */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="524622105919" eventName="XV de Renata" />
      </div>

    </div>
  );
};

export default RenataXVLayout;