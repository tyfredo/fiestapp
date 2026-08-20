import React, { useState, useEffect, useRef } from 'react';
import RSVPButton from '../components/RSVPButton';

// ── ASSETS ──────────────────────────────────────────────────────────────────
import foto1 from '../assets/sarahi/foto-2.jpeg';
import foto2 from '../assets/sarahi/foto-2.png';
import foto3 from '../assets/sarahi/foto-3.jpeg';
import fraseImg      from '../assets/sarahi/frase.png';
import iconIglesia   from '../assets/sarahi/icon-iglesia.png';
import iconRecepcion from '../assets/sarahi/icon-recepcion.png';
import iconCena      from '../assets/sarahi/icon-cena.png';
import iconBaile     from '../assets/sarahi/icon-baile.png';
import iconFiesta    from '../assets/sarahi/icon-fiesta.png';
import iconVals      from '../assets/sarahi/icon-vals.png';
import iconDresscode from '../assets/sarahi/icon-dresscode.png';
import logoFiestapp  from '../assets/logo.png';
import song1         from '../assets/sarahi/song1.m4a';
import flor1         from '../assets/sarahi/flor1.png';
import flor2         from '../assets/sarahi/flor2.png';
import flor3         from '../assets/sarahi/flor3.png';
// ────────────────────────────────────────────────────────────────────────────

const OLIVE       = '#5C6440';
const OLIVE_DARK  = '#454C30';
const OLIVE_LIGHT = '#7C8A57';
const CREAM       = '#F6F2E9';
const CREAM_SOFT  = '#EFEADC';
const INK         = '#38392E';

const COLORES_INVITADOS = [
  { nombre: 'Azul Humo',     hex: '#8FA3B0' },
  { nombre: 'Verde Oliva',   hex: '#5C6640' },
  { nombre: 'Chocolate',     hex: '#4A342A' },
  { nombre: 'Gris Carbón',   hex: '#4B4B4B' },
  { nombre: 'Vino',          hex: '#5C1E24' },
  { nombre: 'Ciruela Suave', hex: '#5A4256' },
];

// ── FADE IN ──────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} style={{
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
    }}>
      {children}
    </div>
  );
};

// ── DIVIDER ──────────────────────────────────────────────────────────────────
const Divider = ({ color = OLIVE }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '18px auto', maxWidth: 220 }}>
    <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
    <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${color}` }} />
    <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
);

// ── COUNTDOWN ────────────────────────────────────────────────────────────────
const CountdownRef = ({ targetDate }) => {
  const [t, setT] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff < 0) return;
      setT({
        dias:  Math.floor(diff / 86400000),
        horas: Math.floor((diff % 86400000) / 3600000),
        min:   Math.floor((diff % 3600000) / 60000),
        seg:   Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: OLIVE, marginBottom: 14 }}>Faltan</p>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,8vw,46px)', fontWeight: 600, color: INK, letterSpacing: '0.03em' }}>
        {pad(t.dias)} : {pad(t.horas)} : {pad(t.min)} : {pad(t.seg)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px,6vw,34px)', marginTop: 8 }}>
        {['Días','Horas','Min','Seg'].map(l => (
          <span key={l} style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a78', width: 46, textAlign: 'center' }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ── CALENDAR ─────────────────────────────────────────────────────────────────
const CalendarioBoda = ({ year, month, day }) => {
  const nombreMes = new Date(year, month, 1).toLocaleDateString('es-MX', { month: 'long' }).toUpperCase();
  const primerDia = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDias = new Date(year, month + 1, 0).getDate();
  const celdas = [...Array(primerDia).fill(null), ...Array.from({ length: totalDias }, (_, i) => i + 1)];
  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: OLIVE, textAlign: 'center', marginBottom: 4 }}>El Gran Día</p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: 'italic', textAlign: 'center', color: INK, marginBottom: 18 }}>{nombreMes} {year}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginBottom: 6 }}>
        {['LUN','MAR','MIE','JUE','VIE','SAB','DOM'].map(d => (
          <div key={d} style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, textAlign: 'center', color: '#9a9a88' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
        {celdas.map((d, i) => (
          <div key={i} style={{
            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond',serif", fontSize: 14, borderRadius: '50%',
            background: d === day ? OLIVE : 'transparent',
            color: d === day ? CREAM : d ? INK : 'transparent',
            fontWeight: d === day ? 700 : 400,
            border: d === day ? `1px solid ${OLIVE}` : 'none',
          }}>{d || ''}</div>
        ))}
      </div>
    </div>
  );
};

// ── ITINERARIO ITEM ───────────────────────────────────────────────────────────
const ItinerarioItem = ({ icon, hora, texto, isLast = false }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 54, height: 54, borderRadius: '50%', background: CREAM_SOFT,
        border: `1px solid ${OLIVE}55`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, padding: 10,
      }}>
        <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      {!isLast && <div style={{ width: 1, flex: 1, minHeight: 34, background: `${OLIVE}44`, marginTop: 6 }} />}
    </div>
    <div style={{ paddingTop: 10, paddingBottom: isLast ? 0 : 30 }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: INK, marginBottom: 2 }}>{hora}</p>
      <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5a' }}>{texto}</p>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
const SarahiAndSebastian = () => {
  const [phase, setPhase] = useState('idle'); // idle | opening | open
  const [hideEnvelope, setHideEnvelope] = useState(false);
  const fechaBoda = '2026-11-27T17:00:00';

  const handleOpen = () => {
    if (phase !== 'idle') return;
    // Música
    const audio = new Audio(song1);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
    // Animación sobre
    setPhase('opening');
    setTimeout(() => {
      setPhase('open');
      setTimeout(() => setHideEnvelope(true), 700);
    }, 1000);
  };

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: "'Jost',sans-serif", overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        .script-title { font-family: 'Parisienne', cursive; }

        .btn-outline-olive {
          display: inline-block; background: transparent; color: ${OLIVE};
          font-family: 'Jost',sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 11px 28px; border: 1px solid ${OLIVE}; border-radius: 2px;
          cursor: pointer; transition: all 0.3s ease; text-decoration: none;
        }
        .btn-outline-olive:hover { background: ${OLIVE}; color: ${CREAM}; }

        /* ── SOBRE ── */
        .envelope-wrap {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: ${OLIVE};
          cursor: pointer;
        }
        /* Cuerpo del sobre */
        .envelope-body {
          position: relative;
          width: min(320px, 82vw);
          aspect-ratio: 1.618 / 1;
          background: ${CREAM_SOFT};
          border-radius: 4px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.35);
          overflow: visible;
        }
        /* Solapa inferior izquierda y derecha — forman el "V" del fondo */
        .flap-bottom-left {
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0;
        }
        /* Solapa superior (la que se abre) */
        .flap-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 50%;
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.4,0,0.2,1);
          z-index: 3;
        }
        .flap-top-inner {
          width: 100%; height: 100%;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          background: linear-gradient(160deg, ${OLIVE_LIGHT} 0%, ${OLIVE} 100%);
        }
        .flap-top.open {
          transform: rotateX(-180deg);
        }

        /* Carta que sale del sobre */
        .carta {
          position: absolute;
          left: 6%; right: 6%;
          bottom: 8%;
          height: 90%;
          background: ${CREAM};
          border-radius: 2px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 18px 14px;
          box-shadow: 0 -4px 18px rgba(0,0,0,0.12);
          transition: transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.2s, opacity 0.4s ease 0.2s;
          transform: translateY(0);
          opacity: 1;
          z-index: 2;
        }
        .carta.rising {
          transform: translateY(-110%);
          opacity: 0;
        }

        /* Fade out del sobre completo */
        .envelope-wrap.fading {
          opacity: 0;
          transition: opacity 0.5s ease 0.5s;
          pointer-events: none;
        }

        /* Flores deco en el hero del sobre */
        .env-flor2 {
          position: absolute; bottom: -18px; left: -24px;
          width: 130px; opacity: 0.9;
          pointer-events: none; z-index: 5;
          transform: rotate(-15deg);
        }
        .env-flor3 {
          position: absolute; top: -14px; right: -20px;
          width: 110px; opacity: 0.85;
          pointer-events: none; z-index: 5;
          transform: rotate(20deg) scaleX(-1);
        }
        .env-flor1 {
          position: absolute; bottom: -30px; right: -16px;
          width: 100px; opacity: 0.8;
          pointer-events: none; z-index: 5;
          transform: rotate(10deg);
        }

        @keyframes shimmer {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          SOBRE ANIMADO
          ═══════════════════════════════════════════════════════════════════ */}
      {!hideEnvelope && (
        <div
          className={`envelope-wrap${phase === 'open' ? ' fading' : ''}`}
          onClick={handleOpen}
        >
          {/* Flores decorativas alrededor del sobre */}
          <img src={flor2} className="env-flor2" alt="" />
          <img src={flor3} className="env-flor3" alt="" />
          <img src={flor1} className="env-flor1" alt="" />

          {/* Sobre */}
          <div className="envelope-body" style={{ perspective: 900 }}>

            {/* ── Triángulos de las solapas laterales y base (decorativas, estáticas) ── */}
            {/* Lateral izquierdo */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, zIndex: 1,
              width: 0, height: 0,
              borderStyle: 'solid',
              borderWidth: '0 0 100% 50%',  // no lo usamos, hacemos con clip-path
            }} />
            {/* Fondo tricolor lateral */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
              background: `linear-gradient(to bottom, ${CREAM_SOFT}, #e0dac8)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              clipPath: 'polygon(0 0, 0 100%, 50% 55%)',
              background: '#ddd8c4',
            }} />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              clipPath: 'polygon(100% 0, 100% 100%, 50% 55%)',
              background: '#d5cfbb',
            }} />

            {/* ── Carta interior ── */}
            <div className={`carta${phase === 'open' ? ' rising' : ''}`}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: OLIVE, marginBottom: 8 }}>
         
                <br></br>
              </p>
              <p className="script-title" style={{ fontSize: 28, color: INK, lineHeight: 1.1, marginBottom: 2 }}></p>
              <br></br>
              <p className="script-title" style={{ fontSize: 16, color: OLIVE, margin: '2px 0' }}></p>
              <p className="script-title" style={{ fontSize: 28, color: INK, lineHeight: 1.1, marginBottom: 10 }}></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, maxWidth: 140 }}>
                <div style={{ flex: 1, height: 1, background: `${OLIVE}66` }} />
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: OLIVE }} />
                <div style={{ flex: 1, height: 1, background: `${OLIVE}66` }} />
              </div>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a8a78' }}>
                Tienes una Invitación
              </p>
            </div>

            {/* ── Solapa superior (la que se dobla hacia atrás) ── */}
            <div className={`flap-top${phase === 'opening' || phase === 'open' ? ' open' : ''}`}>
              <div className="flap-top-inner" />
            </div>
          </div>

          {/* Texto toca para abrir */}
          <p style={{
            position: 'absolute', bottom: 44,
            fontFamily: "'Jost',sans-serif", fontSize: 10,
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: 'rgba(246,242,233,0.75)',
            animation: 'shimmer 2.2s ease-in-out infinite',
            opacity: phase === 'idle' ? 1 : 0,
            transition: 'opacity 0.3s',
          }}>
            ✦ Toca para abrir ✦
          </p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
        background: OLIVE, color: CREAM, overflow: 'hidden',
      }}>
        {/* Flores decorativas hero */}
        <img src={flor2} alt="" style={{
          position: 'absolute', bottom: -10, left: -20, width: 160,
          opacity: 0.55, pointerEvents: 'none',
          
        }} />
        <img src={flor1} alt="" style={{
          position: 'absolute', top: -10, right: -16, width: 180,
          opacity: 0.5, pointerEvents: 'none',
          transform: 'rotate(15deg) scaleX(-1)',
        }} />
        

        <div style={{
          position: 'relative', zIndex: 2,
          opacity: phase === 'open' || hideEnvelope ? 1 : 0,
          transform: phase === 'open' || hideEnvelope ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.1s ease 0.3s, transform 1.1s ease 0.3s',
        }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.85 }}>
            Nos Casamos
          </p>
          <h1 className="script-title" style={{ fontSize: 'clamp(56px,15vw,96px)', lineHeight: 1.05, marginBottom: 6 }}>Sarahi</h1>
          <p className="script-title" style={{ fontSize: 'clamp(28px,7vw,42px)', margin: '4px 0' }}>&amp;</p>
          <h1 className="script-title" style={{ fontSize: 'clamp(56px,15vw,96px)', lineHeight: 1.05, marginBottom: 24 }}>Sebastian</h1>
          <Divider color={CREAM} />
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 10 }}>
            Viernes 27 de Noviembre
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, letterSpacing: '0.15em', marginTop: 4 }}>
            2026
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. FOTO PRINCIPAL
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 0 }}>
        <img src={foto2} alt="Sarahi y Sebastian"
          style={{ width: '100%', maxHeight: 640, objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. FRASE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Flor decorativa sección frase */}
        <img src={flor2} alt="" style={{
          position: 'absolute', bottom: -20, right: -20, width: 160,
          opacity: 0.18, pointerEvents: 'none', transform: 'rotate(20deg)',
        }} />
        <FadeIn>
          <img src={fraseImg} alt="Sé que eres tú y sé que eres para siempre"
            style={{ width: '80%', maxWidth: 380, margin: '0 auto', display: 'block', objectFit: 'contain' }} />
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. PADRINOS DE VELACIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '10px 24px 70px', textAlign: 'center' }}>
        <FadeIn>
          <Divider />
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: OLIVE, marginBottom: 20 }}>
            Padrinos de Velación
          </p>
          {/* Nombres correctos */}
          <p className="script-title" style={{ fontSize: 30, color: INK, lineHeight: 1.3 }}>
            Karla Ponce
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 18, color: OLIVE, margin: '4px 0' }}>
            y
          </p>
          <p className="script-title" style={{ fontSize: 30, color: INK, lineHeight: 1.3 }}>
            Arturo Jaime
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. CUENTA REGRESIVA + CALENDARIO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', background: CREAM_SOFT, borderTop: `1px solid ${OLIVE}22`, borderBottom: `1px solid ${OLIVE}22` }}>
        <FadeIn><CountdownRef targetDate={fechaBoda} /></FadeIn>
        <div style={{ margin: '52px auto 0' }}>
          <FadeIn delay={100}><CalendarioBoda year={2026} month={10} day={27} /></FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CEREMONIA Y RECEPCIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', maxWidth: 640, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 46 }}>
            <img src={iconIglesia} alt="" style={{ width: 52, margin: '0 auto 14px' }} />
            <p className="script-title" style={{ fontSize: 32, color: INK, marginBottom: 4 }}>Ceremonia Religiosa</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, marginBottom: 2 }}>5:00 pm</p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, letterSpacing: '0.08em', color: '#6b6b5a', marginBottom: 4 }}>Parroquia Santa Margarita María de Alacoque</p>
            <a href="https://maps.app.goo.gl/vu7biDrRPX3VEKJq7" className="btn-outline-olive" style={{ marginTop: 14 }}>Ver ubicación</a>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ textAlign: 'center' }}>
            <img src={iconRecepcion} alt="" style={{ width: 52, margin: '0 auto 14px' }} />
            <p className="script-title" style={{ fontSize: 32, color: INK, marginBottom: 4 }}>Recepción</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, marginBottom: 2 }}>6:00 pm</p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, letterSpacing: '0.08em', color: '#6b6b5a', marginBottom: 4 }}>Casa de Eventos Gran Cañada</p>
            <a href="https://maps.app.goo.gl/kn5c2SVXb15afDdt5" className="btn-outline-olive" style={{ marginTop: 14 }}>Ver ubicación</a>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. ITINERARIO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', background: CREAM_SOFT }}>
        <FadeIn>
          <p className="script-title" style={{ fontSize: 34, textAlign: 'center', color: INK, marginBottom: 44 }}>
            Itinerario de Actividades
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ maxWidth: 380, margin: '0 auto' }}>
            <ItinerarioItem icon={iconIglesia}   hora="5:00 pm"  texto="Ceremonia Religiosa" />
            <ItinerarioItem icon={iconRecepcion} hora="6:00 pm"  texto="Recepción" />
            <ItinerarioItem icon={iconCena}      hora="7:00 pm"  texto="Banquete y Cena" />
            <ItinerarioItem icon={iconVals}      hora="8:00 pm"  texto="Primer Baile y Vals" />
            <ItinerarioItem icon={iconBaile}     hora="8:15 pm"  texto="¡A Bailar! Música y Fiesta" />
            <ItinerarioItem icon={iconFiesta}    hora="2:00 am"  texto="Felices para Siempre" isLast />
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. FOTO INTERMEDIA
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px' }}>
        <FadeIn>
          <div style={{ maxWidth: 420, margin: '0 auto', border: `10px solid ${CREAM}`, boxShadow: '0 18px 44px rgba(56,57,46,0.18)' }}>
            <img src={foto1} alt="Sarahi y Sebastian" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. DRESS CODE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '10px 24px 80px', textAlign: 'center' }}>
        <FadeIn>
          <img src={iconDresscode} alt="" style={{ width: 80, margin: '0 auto 18px' }} />
          <p className="script-title" style={{ fontSize: 34, color: INK, marginBottom: 6 }}>Código de Vestimenta</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: OLIVE, marginBottom: 18 }}>Elegante</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 16, color: '#5c5c4d', maxWidth: 420, margin: '0 auto 34px', lineHeight: 1.7 }}>
            Con cariño les pedimos evitar prendas de color blanco y tonos similares.
          </p>
          <div style={{ maxWidth: 460, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a8a78', marginBottom: 18 }}>Colores Sugeridos</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 22px' }}>
              {COLORES_INVITADOS.map(c => (
                <div key={c.nombre} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 78 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }} />
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#6b6b5a', marginTop: 8, lineHeight: 1.3 }}>{c.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          10. REGALO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px', background: OLIVE, color: CREAM, textAlign: 'center' }}>
        <FadeIn>
          <p className="script-title" style={{ fontSize: 32, marginBottom: 14 }}>Sugerencia de Regalo</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.8, opacity: 0.92 }}>
            El mejor regalo es tu presencia, pero si deseas tener un detalle con nosotros, contaremos con lluvia de sobres en el lugar.
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          11. FOTO FINAL
          ═══════════════════════════════════════════════════════════════════ */}
      <section>
        <img src={foto3} alt="Sarahi y Sebastian"
          style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          12. CONFIRMACIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Flor deco confirmación */}
        <img src={flor1} alt="" style={{
          position: 'absolute', bottom: -10, left: -10, width: 140,
          opacity: 0.15, pointerEvents: 'none', transform: 'rotate(-10deg)',
        }} />
        <FadeIn>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: OLIVE, marginBottom: 14 }}>Confirmación</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 17, color: '#5c5c4d', maxWidth: 420, margin: '0 auto 22px', lineHeight: 1.8 }}>
            Agradecemos que confirmes tu asistencia antes del 20 de Septiembre.
          </p>
          <Divider />
          <p className="script-title" style={{ fontSize: 30, color: INK, marginTop: 18 }}>¡Esperamos contar con su presencia!</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, color: '#8a8a78', marginTop: 6 }}>Muchas gracias</p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '40px 24px 130px', textAlign: 'center', background: CREAM_SOFT, borderTop: `1px solid ${OLIVE}22`, position: 'relative', overflow: 'hidden' }}>
        {/* Flor3 centrada sutil en footer */}
        <img src={flor3} alt="" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, opacity: 0.07, pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="script-title" style={{ fontSize: 26, color: OLIVE, opacity: 0.7, marginBottom: 4 }}>Sarahi &amp; Sebastian</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: '0.3em', color: '#a3a390', textTransform: 'uppercase', marginBottom: 26 }}>
            27 · 11 · 2026
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, maxWidth: 200, margin: '0 auto 22px' }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${OLIVE}44)` }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: `${OLIVE}66` }} />
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${OLIVE}44)` }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <img src={logoFiestapp} alt="Fiestapp" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: '0.2em', color: OLIVE, textTransform: 'uppercase' }}>Fiestapp</span>
          </div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: '0.2em', color: '#a3a390', textTransform: 'uppercase', marginTop: 12 }}>
            Crea tu invitación digital · fiestapp.com.mx
          </p>
        </div>
      </footer>

      {/* RSVP flotante */}
      <div style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 50 }}>
        <RSVPButton phone="524622711160" eventName="Boda de Sarahi y Sebastian" />
      </div>

    </div>
  );
};

export default SarahiAndSebastian;