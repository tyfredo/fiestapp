import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

// ── ASSETS ──────────────────────────────────────────────────────────────────
import heroPhoto   from '../assets/xv.jpeg';
import cascada     from '../assets/dorado-cascada.png';   // gold drip desde arriba
import estrella1   from '../assets/dorado-estrella1.png'; // estrella grande
import estrella2   from '../assets/dorado-estrella2.png'; // estrella pequeña
import diamantina  from '../assets/diamantina.png';        // textura glitter dorado
import doradoTop   from '../assets/dorado-top.png';        // splash superior
import doradoFoot  from '../assets/dorado-foot.png';       // splash inferior / footer
import doradoMancha from '../assets/dorado-mancha.png';    // mancha gold
import dresscode   from '../assets/dresscode-formal.png';  // quinceañera dress
import reservado   from '../assets/reservado-festejada.png'; // cartel "reservado"
// ────────────────────────────────────────────────────────────────────────────

// ── FADE-IN ON SCROLL ────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div ref={ref} className={className}
      style={{
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
      }}>
      {children}
    </div>
  );
};

// ── GOLDEN STAR ──────────────────────────────────────────────────────────────
const GoldenStar = ({ size = 24, className = '' }) => (
  <img src={estrella2} alt="" className={className}
    style={{ width: size, height: size, objectFit: 'contain' }} />
);

// ── DIVIDER ──────────────────────────────────────────────────────────────────
const GoldDivider = () => (
  <div className="flex items-center justify-center gap-3 my-6 w-full max-w-xs mx-auto">
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
    <GoldenStar size={18} />
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
  </div>
);

// ── ITINERARY ICON ───────────────────────────────────────────────────────────
const ItineraryIcon = ({ emoji }) => (
  <div style={{
    width: 44, height: 44, borderRadius: '50%',
    background: 'linear-gradient(135deg, #C9A84C, #f0d060)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 14px rgba(201,168,76,0.55)',
    fontSize: 20, flexShrink: 0,
  }}>
    {emoji}
  </div>
);

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
const DulceXVLayout = () => {
  const [envelopeOpen, setEnvelopeOpen]   = useState(false);
  const [hideEnvelope, setHideEnvelope]   = useState(false);
  const [scrollY, setScrollY]             = useState(0);

  const fechaXV = '2026-08-15T17:30:00';

  const handleOpen = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setHideEnvelope(true), 1400);
  };

  useEffect(() => {
    if (!envelopeOpen) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [envelopeOpen]);

  // ── Styles ────────────────────────────────────────────────────────────────
  const BG = '#0A0800';
  const GOLD = '#C9A84C';
  const GOLD_LIGHT = '#F0D060';
  const GOLD_DIM = 'rgba(201,168,76,0.18)';

  const cardStyle = {
    background: 'linear-gradient(160deg, #151100 0%, #1c1600 100%)',
    border: `1px solid ${GOLD}44`,
    borderRadius: 4,
    boxShadow: `0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 ${GOLD}22`,
  };

  const topBarStyle = {
    height: 3,
    background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent)`,
  };

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#EDE0C4', fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: 'hidden', position: 'relative' }}>

      {/* ── GOOGLE FONTS ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Sacramento&display=swap');

        .gold-text {
          background: linear-gradient(135deg, #a07830 0%, #C9A84C 30%, #f5e070 60%, #C9A84C 80%, #a07830 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-gold {
          text-shadow: 0 0 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.2);
        }
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #f0d060, #C9A84C, #8B6914);
          background-size: 200% auto;
          color: #0A0800;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-position 0.5s, transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(201,168,76,0.4);
          text-decoration: none;
        }
        .btn-gold:hover {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.6);
        }
        .btn-gold:active { transform: translateY(0); }

        @keyframes floatStar {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .float-star { animation: floatStar 4s ease-in-out infinite; }
        .shimmer-anim { animation: shimmer 2.5s ease-in-out infinite; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          SOBRE / PANTALLA DE ENTRADA
          ═══════════════════════════════════════════════════════════════════ */}
      {!hideEnvelope && (
        <div
          onClick={handleOpen}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
            background: BG,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 1.3s cubic-bezier(0.86,0,0.07,1)',
            transform: envelopeOpen ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {/* Cascada decorativa en la entrada */}
          <img src={cascada} alt=""
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 700, opacity: 0.55, pointerEvents: 'none', mixBlendMode: 'screen' }} />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Estrella animada */}
            <img src={estrella1} alt="" className="float-star" style={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.8))' }} />

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, opacity: envelopeOpen ? 0 : 1, transition: 'opacity 0.4s' }}
              className="shimmer-anim">
              Toca para abrir tu invitación
            </p>
          </div>

          {/* Diamantina en el fondo */}
          <img src={diamantina} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'screen' }} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO / PORTADA
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Foto de la festejada — parallax suave */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${scrollY * 0.25}px)`,
        }}>
          <img src={heroPhoto} alt="Dulce Valentina"
            style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center top' }} />
          {/* Gradientes sobre la foto */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,0,0.3) 0%, rgba(10,8,0,0.15) 40%, rgba(10,8,0,0.75) 85%, #0A0800 100%)' }} />
          {/* Velo dorado */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        </div>

        {/* Cascada dorada superior */}
        <img src={cascada} alt=""
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, opacity: 0.45, pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 2 }} />

        {/* Estrella deco top-left */}
        <img src={estrella2} alt=""
          style={{ position: 'absolute', top: 32, left: 20, width: 50, opacity: 0.7, pointerEvents: 'none', zIndex: 2, filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.6))' }} className="float-star" />
        <img src={estrella1} alt=""
          style={{ position: 'absolute', top: 20, right: 18, width: 64, opacity: 0.65, pointerEvents: 'none', zIndex: 2, filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.6))', animationDelay: '1.5s' }} className="float-star" />

        {/* Contenido central */}
        <div style={{
          position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px',
          opacity: envelopeOpen ? 1 : 0,
          transform: envelopeOpen ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s',
          marginTop: 40,
        }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            Mis XV Años
          </p>

          {/* Nombre grande */}
          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: 'clamp(80px, 22vw, 150px)',
            lineHeight: 1,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #a07830 0%, #C9A84C 25%, #f5e070 55%, #C9A84C 78%, #a07830 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 12px rgba(201,168,76,0.4))',
          }}>
            Dulce Valentina
          </h1>

          {/* Línea decorativa */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '12px auto', maxWidth: 280 }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <img src={estrella2} alt="" style={{ width: 20, height: 20 }} />
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.35em', color: '#EDE0C4', marginBottom: 4 }}>
            SÁBADO • 15 DE AGOSTO
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 22, letterSpacing: '0.2em', color: GOLD }}>
            2026
          </p>
        </div>

        {/* Mancha dorada inferior */}
        <img src={doradoMancha} alt=""
          style={{ position: 'absolute', bottom: -20, left: -20, width: 200, opacity: 0.35, pointerEvents: 'none', zIndex: 2, mixBlendMode: 'screen' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. FRASE + FOTO POLAROID
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Diamantina de fondo muy suave */}
        <img src={diamantina} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <FadeIn>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            {/* Comillas decorativas */}
            <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 64, color: GOLD, lineHeight: 0.6, marginBottom: 16, opacity: 0.6 }}>"</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(16px, 4.5vw, 20px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#EDE0C4',
              letterSpacing: '0.02em',
            }}>
              Hay recuerdos que se guardan en el corazón para siempre. Quiero que formes parte de uno de los míos más hermosos: mi fiesta de XV años.
            </p>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 38, background: 'linear-gradient(135deg, #C9A84C, #f0d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dulce Valentina
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. PADRINOS
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Mancha dorada deco */}
        <img src={doradoMancha} alt=""
          style={{ position: 'absolute', top: -30, right: -30, width: 180, opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'screen', transform: 'rotate(60deg)' }} />

        <FadeIn>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ ...cardStyle, padding: '40px 32px', textAlign: 'center' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '32px 24px 28px' }}>

                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                  Con la Bendición de Dios
                </p>

                <GoldDivider />

                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}>
                  Mis Padrinos
                </p>

                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em', marginBottom: 6 }}>
                  Ivonne Ibarra
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: GOLD, letterSpacing: '0.3em', marginBottom: 6 }}>&amp;</p>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em' }}>
                  Alejandro Patlán
                </p>

                <GoldDivider />

                <p style={{ fontSize: 13, fontStyle: 'italic', color: '#a09070', lineHeight: 1.7 }}>
                  Su amor y apoyo hacen posible<br />este momento tan especial.
                </p>
              </div>
              <div style={topBarStyle} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. CUENTA REGRESIVA
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22` }}>
        {/* Fondo diamantina */}
        <img src={diamantina} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        {/* Estrellas deco */}
        <img src={estrella2} alt="" style={{ position: 'absolute', top: 16, left: 16, width: 36, opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'screen' }} className="float-star" />
        <img src={estrella2} alt="" style={{ position: 'absolute', bottom: 16, right: 20, width: 28, opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'screen', animationDelay: '2s' }} className="float-star" />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 24 }}>
              Save the Date · La magia comienza en
            </p>
            <div style={{ color: GOLD_LIGHT, filter: 'drop-shadow(0 0 18px rgba(201,168,76,0.4))' }}>
              <Countdown targetDate={fechaXV} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. ITINERARIO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Dorado-top como separador visual */}
        <img src={doradoTop} alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0.18, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <FadeIn>
          <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>El Programa</p>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 28, color: GOLD_LIGHT, letterSpacing: '0.05em' }}>
                Itinerario
              </h2>
              <GoldDivider />
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Línea vertical */}
              <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${GOLD}88, ${GOLD}88, transparent)` }} />

              {[
                { hour: '17:30', label: 'Ceremonia Religiosa', desc: 'Parroquia San Juan Bosco', emoji: '⛪' },
                { hour: '19:00', label: 'Recepción', desc: 'Llegada de invitados · Cavas de Mendiola', emoji: '✨' },
                { hour: '19:30', label: 'Cena', desc: 'Disfruta de la velada', emoji: '🍽️' },
                { hour: '20:30', label: 'Vals y Brindis', desc: 'El momento más especial de la noche', emoji: '🥂' },
                { hour: '21:00', label: '¡A Bailar!', desc: 'Pista abierta · ¡Prepara tus pasos!', emoji: '💃' },
              ].map((item, i) => (
                <FadeIn delay={i * 100} key={i}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 36, position: 'relative' }}>
                    {/* Punto en la línea */}
                    <div style={{
                      position: 'absolute', left: -28 + 20 - 6, top: 10,
                      width: 12, height: 12, borderRadius: '50%',
                      background: GOLD, boxShadow: `0 0 12px ${GOLD}`,
                    }} />

                    <ItineraryIcon emoji={item.emoji} />

                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', color: GOLD, marginBottom: 4 }}>
                        {item.hour} HRS
                      </p>
                      <h4 style={{ fontSize: 20, fontWeight: 300, color: '#EDE0C4', marginBottom: 3, letterSpacing: '0.02em' }}>
                        {item.label}
                      </h4>
                      <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic' }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. LOCACIONES
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '20px 24px 80px', position: 'relative' }}>
        <FadeIn>
          <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 2 }}>

            {/* Ceremonia */}
            <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⛪</div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Ceremonia Religiosa</p>
                <h3 style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', marginBottom: 4 }}>Parroquia San Juan Bosco</h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.2em', color: GOLD_LIGHT, marginBottom: 6 }}>17:30 HRS</p>
                <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic', marginBottom: 20 }}>Irapuato, Guanajuato</p>
                <MapButton
                  location="https://maps.app.goo.gl/73XBrzsqbivhTfSk6"
                  label="Ver Ubicación"
                  className="btn-gold"
                />
              </div>
              <div style={topBarStyle} />
            </div>

            {/* Recepción */}
            <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Recepción</p>
                <h3 style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', marginBottom: 4 }}>Cavas de Mendiola</h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.2em', color: GOLD_LIGHT, marginBottom: 6 }}>19:00 HRS</p>
                <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic', marginBottom: 20 }}>Irapuato, Guanajuato</p>
                <MapButton
                  location="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x842c807535937005:0x61f35bde817392f4"
                  label="Ver Ubicación"
                  className="btn-gold"
                />
              </div>
              <div style={topBarStyle} />
            </div>

          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. DRESS CODE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}22` }}>
        <img src={doradoMancha} alt=""
          style={{ position: 'absolute', bottom: -20, right: -20, width: 220, opacity: 0.25, pointerEvents: 'none', mixBlendMode: 'screen', transform: 'rotate(30deg)' }} />

        <FadeIn>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', textAlign: 'center' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '36px 28px' }}>

                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                  Para Este Día Especial
                </p>
                <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 20, color: GOLD_LIGHT, marginBottom: 4 }}>
                  Código de Vestimenta
                </h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: '0.25em', color: '#EDE0C4', marginBottom: 20 }}>
                  FORMAL
                </p>

                <GoldDivider />

                {/* Imagen del dress code */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
                  <img src={dresscode} alt="Vestimenta de la festejada"
                    style={{ width: 100, objectFit: 'contain', filter: 'drop-shadow(0 4px 20px rgba(201,168,76,0.4))' }} />
                </div>

                {/* Cartel "reservado" */}
                <div style={{ marginBottom: 20 }}>
                  <img src={reservado} alt="Color reservado para la festejada"
                    style={{ maxWidth: 260, width: '100%', margin: '0 auto', display: 'block', filter: 'drop-shadow(0 2px 12px rgba(201,168,76,0.5))' }} />
                </div>

                <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic', lineHeight: 1.7 }}>
                  El color <strong style={{ color: GOLD }}>dorado</strong> queda reservado exclusivamente para la quinceañera.
                </p>

              </div>
              <div style={topBarStyle} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. LLUVIA DE SOBRES + BEBIDAS
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Estrella flotante deco */}
        <img src={estrella1} alt=""
          style={{ position: 'absolute', top: 20, right: 12, width: 60, opacity: 0.45, pointerEvents: 'none', mixBlendMode: 'screen', animationDelay: '1s' }} className="float-star" />

        <FadeIn>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', textAlign: 'center' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '36px 28px' }}>

                <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 52, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.1, marginBottom: 4 }}>
                  Mesa de
                </p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, letterSpacing: '0.2em', color: GOLD_LIGHT, marginBottom: 20 }}>
                  REGALOS
                </h3>

                <GoldDivider />

                <p style={{ fontSize: 14, fontStyle: 'italic', color: '#c8b080', lineHeight: 1.8, marginBottom: 20 }}>
                  Tu presencia es mi verdadero regalo,<br />
                  pero si deseas tener un detalle conmigo,<br />
                  lo recibiré con todo el corazón.
                </p>

                {/* Ícono de sobre */}
                <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>

                <div style={{ background: `${GOLD_DIM}`, border: `1px solid ${GOLD}33`, borderRadius: 2, padding: '16px 20px', marginBottom: 0 }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
                    Lluvia de Sobres
                  </p>
                  <p style={{ fontSize: 13, color: '#a09070', lineHeight: 1.6 }}>
                    Contaremos con buzón en el evento.
                  </p>
                </div>

                <GoldDivider />

                {/* Bebidas */}
                <div style={{ background: `${GOLD_DIM}`, border: `1px solid ${GOLD}33`, borderRadius: 2, padding: '16px 20px' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
                    Bebidas
                  </p>
                  <p style={{ fontSize: 13, color: '#a09070', lineHeight: 1.6 }}>
                    Puedes llevar tu bebida de preferencia. 🥂
                  </p>
                </div>

              </div>
              <div style={topBarStyle} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. CONFIRMACIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}22`, textAlign: 'center' }}>
        <img src={cascada} alt=""
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) scaleY(-1)', width: '100%', maxWidth: 700, opacity: 0.25, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <img src={estrella1} alt="" style={{ width: 60, margin: '0 auto 20px', display: 'block', filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.7))' }} className="float-star" />

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
              Confirmación de Asistencia
            </p>
            <h2 style={{ fontFamily: "'Sacramento', cursive", fontSize: 48, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>
              ¡Te esperamos!
            </h2>
            <p style={{ fontSize: 14, color: '#a09070', fontStyle: 'italic', marginBottom: 6 }}>
              Favor de confirmar antes del
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: GOLD_LIGHT, letterSpacing: '0.15em', marginBottom: 8 }}>
              20 DE JULIO
            </p>

            <GoldDivider />

            <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic' }}>
              Será un placer tenerte en este momento tan especial. 💛
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '40px 24px 120px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}15` }}>
        <img src={doradoFoot} alt=""
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', opacity: 0.2, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 52, color: GOLD, opacity: 0.5, marginBottom: 4 }}>
            Dulce Valentina
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.4em', color: '#4a3f28', textTransform: 'uppercase' }}>
            XV Años · 15 · 08 · 2026
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE RSVP
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', bottom: 28, right: 20, zIndex: 50 }}>
        <RSVPButton phone="524621892165" eventName="XV de Dulce Valentina" />
      </div>

    </div>
  );
};

export default DulceXVLayout;