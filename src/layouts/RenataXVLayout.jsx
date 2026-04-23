import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

import floresArriba from '../assets/flor-arriba.png';
import floresAbajo from '../assets/flor-abajo.png';
import fondoPapel from '../assets/textura-papel.png';
import selloCera from '../assets/sello-cera.png';
import logoFiestapp from '../assets/logo.png';

// MAGNOLIAS DE LAS ESQUINAS
import man3 from '../assets/man3.png';
import man6 from '../assets/man6.png';

// SAKURA PARA LOS PAPÁS
import sakuraPapas from '../assets/sakura-papas.png';

// ICONOS DEL ITINERARIO
import sakIcon from '../assets/sak-icon.png';
import iglesiaIcon from '../assets/iglesia-icon.png';
import recepcionIcon from '../assets/recepcion-icon.png';
import comidaIcon from '../assets/comida-icon.png';
import valsIcon from '../assets/vals-icon.png';
import musicaIcon from '../assets/musica-icon.png';

// ICONOS TARJETAS DE LOCACIÓN
import iglesiaCardIcon from '../assets/iglesia-icon-card.png';
import recepcionCardIcon from '../assets/recepcion-icon-card.png';

// LIRIOS PARA COUNTDOWN E ITINERARIO
import lirioArribaIzquierda from '../assets/lirio-arriba-izquierda.png';
import lirioArribaDerecha from '../assets/lirio-arriba-derecha.png';
import lirioAbajoIzquierda from '../assets/lirio-abajo-izquierda.png';
import lirioAbajoDerecha from '../assets/lirio-abajo-derecha.png';

// SOUNDTRACK, PLAY, SOBRE, DRESSCODE Y BACKGROUND
import playIcon from '../assets/play.png';
import sobreIcon from '../assets/sobre.png';
import dressCodeIcon from '../assets/dress-code-icon.png';
import itinerarioBackground from '../assets/background.png';
import vivaLaVida from '../assets/vivalavida.mp3';

// --- COMPONENTE DE ANIMACIÓN ---
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { setVisible(entry.isIntersecting); }); },
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
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
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const fechaEvento = "2026-07-18T13:00:00";

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => { setHideEnvelope(true); }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    if (isEnvelopeOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnvelopeOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen text-stone-800 font-serif overflow-x-hidden relative bg-[#F9F6F0]">

      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src={vivaLaVida} loop preload="auto" />

      {/* =========================================
          MINI-PLAYER FLOTANTE — estilo referencia
          Visible solo después de abrir el sobre
          ========================================= */}
      {hideEnvelope && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-3 pb-2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(249,246,240,0.95) 80%, transparent)' }}
        >
          {/* Barra de progreso decorativa (no funcional, solo visual) */}
          <div className="w-48 md:w-64 h-[2px] bg-botanical-grass/20 rounded-full mb-2 pointer-events-auto">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isPlaying ? 'w-1/3' : 'w-0'}`}
              style={{ background: '#8096AD' }}
            />
            {isPlaying && (
              <div
                className="w-2.5 h-2.5 rounded-full -mt-[5px] transition-all duration-700"
                style={{ background: '#8096AD', marginLeft: 'calc(33% - 5px)' }}
              />
            )}
          </div>

          {/* Controles */}
          <div className="flex items-center gap-5 pointer-events-auto">
            {/* Skip back (decorativo) */}
            <button
              aria-label="Anterior"
              className="opacity-40 cursor-default focus:outline-none"
              style={{ color: '#8096AD' }}
              tabIndex={-1}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
              </svg>
            </button>

            {/* Botón play/pause principal — usa play.png */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              className="focus:outline-none group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110"
                style={{ borderColor: '#8096AD', background: 'rgba(128,150,173,0.08)' }}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#8096AD">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <img src={playIcon} alt="Play" className="w-5 h-5 object-contain" style={{ filter: 'hue-rotate(180deg) saturate(0.7) brightness(0.75)' }} />
                )}
              </div>
            </button>

            {/* Skip forward (decorativo) */}
            <button
              aria-label="Siguiente"
              className="opacity-40 cursor-default focus:outline-none"
              style={{ color: '#8096AD' }}
              tabIndex={-1}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
              </svg>
            </button>
          </div>

          {/* Texto */}
          <p
            className="text-[9px] tracking-[0.3em] uppercase font-bold mt-1 pointer-events-none"
            style={{ color: '#8096AD' }}
          >
            {isPlaying ? 'Reproduciendo ♪' : 'Haz click para reproducir'}
          </p>
        </div>
      )}

      {/* =========================================
          EL SOBRE (TELÓN OPACO)
          ========================================= */}
      {!hideEnvelope && (
        <div
          onClick={handleOpenEnvelope}
          className={`fixed top-0 left-0 w-full h-[100dvh] z-[999] flex flex-col items-center justify-center bg-[#F9F6F0] cursor-pointer transition-transform duration-[1200ms] ease-in-out ${
            isEnvelopeOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{ backgroundImage: `url(${fondoPapel})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-stone-900/10"></div>
          <div className="relative z-10 flex flex-col items-center group">
            <div className={`w-32 h-32 flex items-center justify-center mb-6 transition-all duration-700 ${isEnvelopeOpen ? 'scale-150 opacity-0' : 'group-hover:scale-110'}`}>
              <img src={selloCera} alt="Sello de Cera" className="w-full h-full object-contain" />
            </div>
            <p className={`text-[#B9AF5F] tracking-[0.4em] uppercase text-xs font-bold animate-pulse transition-opacity duration-300 ${isEnvelopeOpen ? 'opacity-0' : 'opacity-100'}`}>
              Toca para abrir
            </p>
          </div>
        </div>
      )}

      {/* =========================================
          1. PORTADA
          ========================================= */}
      <section className="relative min-h-[90dvh] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondoPapel})` }}>
          <div className="absolute inset-0 bg-[#F9F6F0]/60"></div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center p-4 md:p-10"
          style={{ transform: `translateY(${scrollY * 0.35}px)`, opacity: Math.max(1 - scrollY / 400, 0) }}
        >
          <img src={floresArriba} alt="Flores superiores"
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[115%] md:w-full max-w-3xl z-10 pointer-events-none transition-all duration-[1500ms] ease-out ${isEnvelopeOpen ? 'translate-y-0 opacity-100 delay-300' : '-translate-y-24 opacity-0'}`} />
          <img src={floresAbajo} alt="Flores inferiores"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] md:w-full max-w-3xl z-10 pointer-events-none transition-all duration-[1500ms] ease-out ${isEnvelopeOpen ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-24 opacity-0'}`} />
          <div className={`relative z-20 w-full max-w-2xl flex flex-col items-center text-center drop-shadow-sm -mt-8 md:mt-0 transition-all duration-[1500ms] ease-out ${isEnvelopeOpen ? 'opacity-100 scale-100 delay-700' : 'opacity-0 scale-90'}`}>
            <p className="text-botanical-thicket tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-2">Mis XV Años</p>
            <h1 className="text-[120px] md:text-[160px] leading-none mb-2 text-botanical-berry font-script drop-shadow-sm">Renata</h1>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center space-x-4 md:space-x-8">
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-botanical-thicket">Sábado</p>
                <div className="h-[1px] w-8 md:w-16 bg-botanical-grass"></div>
                <p className="text-5xl md:text-7xl font-serif text-stone-800 font-light">18</p>
                <div className="h-[1px] w-8 md:w-16 bg-botanical-grass"></div>
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-botanical-thicket">Julio</p>
              </div>
              <p className="text-stone-500 tracking-[0.5em] mt-3 text-sm md:text-base font-light">2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. PADRES Y PADRINOS — rediseño elegante
          ========================================= */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        {/* Sakura fondo */}
        <img src={sakuraPapas} alt=""
          className="absolute top-0 left-0 -translate-x-8 md:-translate-x-12 -translate-y-8 md:-translate-y-12 w-64 md:w-[420px] opacity-80 pointer-events-none mix-blend-multiply" />
        {/* Lirio decorativo derecha */}
        <img src={lirioArribaDerecha} alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-28 md:w-44 pointer-events-none mix-blend-multiply opacity-55" />

        <div className="max-w-lg mx-auto relative z-10 pt-8">
          <FadeInSection>
            {/* Tarjeta contenedora */}
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(253,252,248,0.92) 0%, rgba(245,240,232,0.92) 100%)',
                border: '1px solid rgba(185,175,95,0.25)',
                boxShadow: '0 8px 40px rgba(60,50,40,0.08)',
              }}
            >
              {/* Borde superior dorado */}
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #CFAA7D, #B9AF5F, #CFAA7D, transparent)' }} />

              <div className="px-8 py-12 text-center">

                {/* ── PADRES ── */}
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-3" style={{ color: '#B9AF5F' }}>
                  En compañía de mis padres
                </p>

                {/* Ornamento */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, transparent, #CC7C72)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CC7C72' }} />
                  <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, transparent, #CC7C72)' }} />
                </div>

                <p className="text-xl md:text-2xl text-stone-700 font-serif leading-relaxed">
                  Francisco Hernández
                </p>
                <p className="text-xs tracking-[0.3em] uppercase my-2" style={{ color: '#B9AF5F' }}>y</p>
                <p className="text-xl md:text-2xl text-stone-700 font-serif leading-relaxed">
                  Mayela Ornelas
                </p>

                {/* Separador elegante */}
                <div className="flex items-center justify-center gap-3 my-10">
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to right, transparent, #CFAA7D 40%, #B9AF5F 60%, transparent)' }} />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: '#CFAA7D' }}>
                    <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20.5 L12 16.5 L7.5 20.5 L9.5 13.5 L4 9 L10.5 9 Z"
                      fill="#CFAA7D" opacity="0.7" />
                  </svg>
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to left, transparent, #CFAA7D 40%, #B9AF5F 60%, transparent)' }} />
                </div>

                {/* ── FRASE PADRINOS (arriba del título) ── */}
                <p className="text-stone-400 text-sm font-serif italic leading-relaxed mb-6 max-w-xs mx-auto">
                  "Necesito un par de manos extras para ayudarme a crecer,
                  y las de ustedes son las mejores."
                </p>

                {/* Ornamento */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, transparent, #8096AD)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8096AD' }} />
                  <div className="h-[1px] flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, transparent, #8096AD)' }} />
                </div>

                <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-3" style={{ color: '#8096AD' }}>
                  Y mis padrinos
                </p>

                <p className="text-lg md:text-xl text-stone-600 font-serif leading-relaxed">
                  Arturo Ornelas
                </p>
                <p className="text-xs tracking-[0.3em] uppercase my-1" style={{ color: '#B9AF5F' }}>y</p>
                <p className="text-lg md:text-xl text-stone-600 font-serif leading-relaxed">
                  Susana Ornelas
                </p>

              </div>

              {/* Borde inferior dorado */}
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #CFAA7D, #B9AF5F, #CFAA7D, transparent)' }} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =========================================
          3. CUENTA REGRESIVA
          ========================================= */}
      <section className="py-20 text-center border-y border-botanical-grass/20 bg-white/30 backdrop-blur-sm relative z-10 overflow-hidden">
        <img src={lirioArribaIzquierda} alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-28 md:w-40 pointer-events-none mix-blend-multiply opacity-75" />
        <img src={lirioArribaDerecha} alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-28 md:w-40 pointer-events-none mix-blend-multiply opacity-75" />
        <img src={lirioAbajoIzquierda} alt="" aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 md:w-40 pointer-events-none mix-blend-multiply opacity-75" />
        <img src={lirioAbajoDerecha} alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-28 md:w-40 pointer-events-none mix-blend-multiply opacity-75" />
        <FadeInSection>
          <h3 className="text-botanical-thicket text-xs mb-8 uppercase tracking-[0.4em] font-bold">Faltan:</h3>
          <div className="text-4xl md:text-5xl text-botanical-berry">
            <Countdown targetDate={fechaEvento} />
          </div>
        </FadeInSection>
      </section>

      {/* =========================================
          4. ITINERARIO — con background.png
          ========================================= */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">

        {/* Background pattern — repeat para que no se estire */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${itinerarioBackground})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px auto',
            opacity: 0.18,
          }}
        />
        {/* Overlay suave */}
        <div className="absolute inset-0 bg-[#F9F6F0]/55 pointer-events-none" />

        {/* Lirios esquinas */}
        <img src={lirioArribaIzquierda} alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-32 md:w-48 pointer-events-none mix-blend-multiply opacity-60" />
        <img src={lirioArribaDerecha} alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-32 md:w-48 pointer-events-none mix-blend-multiply opacity-60" />
        <img src={lirioAbajoIzquierda} alt="" aria-hidden="true"
          className="absolute bottom-0 left-0 w-32 md:w-48 pointer-events-none mix-blend-multiply opacity-60" />
        <img src={lirioAbajoDerecha} alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-32 md:w-48 pointer-events-none mix-blend-multiply opacity-60" />

        <div className="max-w-2xl mx-auto relative z-10">
          <FadeInSection>
            <h3 className="text-5xl text-botanical-berry mb-16 text-center italic font-light drop-shadow-sm">Itinerario</h3>

            <div className="relative pt-4">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-botanical-berry/30"></div>

              <div className="flex flex-col items-center mb-16 relative z-10 bg-[#F9F6F0]/80 py-2 px-4 rounded-sm">
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
                    <h4 className="text-xl md:text-3xl text-stone-800 font-light italic">Música<br />y Baile</h4>
                  </div>
                </div>

              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =========================================
          5. LOCACIONES Y DETALLES
          ========================================= */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10 bg-transparent">
        <FadeInSection delay={0}>
          <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80 h-full flex flex-col justify-between relative overflow-hidden">
            <img src={man3} alt="Decoración Magnolias" className="absolute top-0 right-0 w-24 md:w-32 opacity-60 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <img src={iglesiaCardIcon} alt="Icono Ceremonia" className="w-20 md:w-24 mb-6 opacity-80 mix-blend-multiply" />
              <h4 className="text-3xl text-botanical-berry mb-6 italic">Ceremonia</h4>
              <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">13:00 HRS</p>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Templo del Señor de la Misericordia<br />
                Prolongación Guerrero #3009<br />
                Fracc. Las Plazas
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <MapButton
                location="https://maps.app.goo.gl/S4FRmRJyKVzL5baM7"
                label="Ver Ubicación"
                className="bg-[#B9AF5F] hover:bg-[#9a9248] transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto"
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
                Jardín Alvori<br />
                Arq. Enrique del moral Domínguez, 36826<br />
                Irapuato, Gto.
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <MapButton
                location="https://maps.app.goo.gl/BMCXJypVH3aHJCcP9"
                label="Ver Ubicación"
                className="bg-[#B9AF5F] hover:bg-[#9a9248] transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold mx-auto"
              />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* =========================================
          6. LLUVIA DE SOBRES
          ========================================= */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${fondoPapel})`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-[#F9F6F0]/80" />
        <img src={lirioArribaIzquierda} alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-24 md:w-36 pointer-events-none mix-blend-multiply opacity-45" />
        <img src={lirioAbajoDerecha} alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-24 md:w-36 pointer-events-none mix-blend-multiply opacity-45" />

        <div className="relative z-10 max-w-sm mx-auto">
          <FadeInSection>
            <div className="rounded-sm shadow-xl overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #fdfcf8 0%, #f5f0e6 100%)', border: '1px solid rgba(185,175,95,0.3)' }}>
              <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #CFAA7D, #B9AF5F, #CFAA7D)' }} />
              <div className="px-10 py-12 text-center">
                <h3 className="text-4xl md:text-5xl leading-tight font-script" style={{ color: '#8096AD' }}>Mesa de</h3>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[0.18em] uppercase mt-1 mb-8" style={{ color: '#8096AD' }}>REGALOS</h2>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="h-[1px] w-10" style={{ background: '#CFAA7D' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CFAA7D' }} />
                  <div className="h-[1px] w-10" style={{ background: '#CFAA7D' }} />
                </div>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed font-serif italic mb-8">
                  Tu presencia es mi verdadero regalo,<br />
                  pero si deseas hacerme un detalle,<br />
                  lo agradeceré de corazón.
                </p>
                <div className="flex justify-center my-8">
                  <img src={sobreIcon} alt="Sobre de regalo" className="w-20 md:w-24 object-contain"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(128,150,173,0.3))' }} />
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-[1px] w-10" style={{ background: '#CFAA7D' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CFAA7D' }} />
                  <div className="h-[1px] w-10" style={{ background: '#CFAA7D' }} />
                </div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-relaxed" style={{ color: '#8096AD' }}>
                  Tendré lluvia de sobres<br />en el evento.
                </p>
              </div>
              <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #CFAA7D, #B9AF5F, #CFAA7D)' }} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =========================================
          7. CÓDIGO DE VESTIMENTA — rediseño con nueva imagen
          ========================================= */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        {/* Fondo sutil */}
        <div className="absolute inset-0 bg-botanical-grass/8 pointer-events-none" />
        <div className="absolute inset-0 border-y border-botanical-grass/20 pointer-events-none" />

        {/* Lirios sutiles */}
        <img src={lirioAbajoIzquierda} alt="" aria-hidden="true"
          className="absolute bottom-0 left-0 w-24 md:w-40 pointer-events-none mix-blend-multiply opacity-40" />
        <img src={lirioArribaDerecha} alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-24 md:w-40 pointer-events-none mix-blend-multiply opacity-40" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              {/* Ornamento superior */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-12" style={{ background: 'linear-gradient(to right, transparent, #CFAA7D)' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CFAA7D' }} />
                <div className="h-[1px] w-12" style={{ background: 'linear-gradient(to left, transparent, #CFAA7D)' }} />
              </div>

              <p className="text-[10px] tracking-[0.45em] uppercase font-bold mb-2" style={{ color: '#B9AF5F' }}>
                Para este día especial
              </p>
              <h3 className="text-4xl md:text-5xl text-botanical-berry mb-1 italic font-light">Código de Vestimenta</h3>
              <p className="text-lg text-stone-700 tracking-[0.3em] uppercase font-bold mt-2 mb-8">Elegant Sport</p>
            </div>

            {/* Imagen dress-code — la imagen que se generó, reemplaza dressCodeIcon */}
            <div className="flex justify-center mb-10">
              <img
                src={dressCodeIcon}
                alt="Código de vestimenta Elegant Sport"
                className="w-full max-w-md object-contain rounded-sm"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(60,50,40,0.10))' }}
              />
            </div>

            {/* Guías rápidas */}
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto mb-10">
              <div className="text-center p-4 rounded-sm" style={{ background: 'rgba(61,79,107,0.06)', border: '1px solid rgba(61,79,107,0.12)' }}>
                <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: '#3D4F6B' }}>Caballero</p>
                <p className="text-xs text-stone-500 font-serif">Saco · Pantalón de vestir</p>
              </div>
              <div className="text-center p-4 rounded-sm" style={{ background: 'rgba(204,124,114,0.06)', border: '1px solid rgba(204,124,114,0.12)' }}>
                <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: '#CC7C72' }}>Dama</p>
                <p className="text-xs text-stone-500 font-serif">Blazer · Vestido · Falda</p>
              </div>
            </div>

            {/* Divisor */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-[1px] w-16" style={{ background: 'linear-gradient(to right, transparent, #CFAA7D)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CFAA7D' }} />
              <div className="h-[1px] w-16" style={{ background: 'linear-gradient(to left, transparent, #CFAA7D)' }} />
            </div>

            {/* Confirmación */}
            <div className="text-center">
              <h3 className="text-2xl italic font-light mb-3" style={{ color: '#8096AD' }}>Confirmación de Asistencia</h3>
              <p className="text-stone-500 font-serif text-sm">
                Favor de confirmar asistencia antes del<br />
                <span className="font-bold text-stone-700 text-base">8 de Julio</span>
              </p>
            </div>

          </FadeInSection>
        </div>
      </section>

      {/* FOOTER DE MARCA */}
      <footer className="w-full pt-12 pb-32 bg-[#F9F6F0] border-t border-botanical-grass/10 z-10 relative">
        <a href="/" target="_self" className="flex flex-col items-center justify-center group">
          <img src={logoFiestapp} alt="Fiestapp Logo"
            className="h-6 mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" />
          <p className="text-[10px] md:text-xs text-botanical-thicket font-serif tracking-[0.4em] uppercase font-bold group-hover:text-botanical-berry transition-colors text-center px-4">
            Crea tu propia invitación inolvidable
          </p>
          <p className="text-[9px] text-stone-400 mt-1">Una experiencia digital de Fiestapp ❤️</p>
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