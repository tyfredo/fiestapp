import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

// ── ASSETS ──────────────────────────────────────────────────────────────────
import heroPhoto    from '../assets/nay.jpeg';
import cascada      from '../assets/dorado-cascada.png';
import estrella1    from '../assets/dorado-estrella1.png';
import estrella2    from '../assets/dorado-estrella2.png';
import diamantina   from '../assets/diamantina.png';
import doradoTop    from '../assets/dorado-top.png';
import doradoFoot   from '../assets/dorado-foot.png';
import doradoMancha from '../assets/dorado-mancha.png';
import dresscode    from '../assets/dresscode-formal.png';
import logoGlitter  from '../assets/logo-glitter.png';

// Fotos de galería
import nay1 from '../assets/nay1.jpeg';
import nay2 from '../assets/nay2.jpeg';
import nay3 from '../assets/nay3.jpeg';
import nay4 from '../assets/nay4.jpeg';
import nay5 from '../assets/nay5.jpeg';
import nay6 from '../assets/nay6.jpeg';
import nay7 from '../assets/nay7.jpeg';
import nay8 from '../assets/nay8.jpeg';
import nay9 from '../assets/nay9.jpeg';

// Canción
import yearsAudio from '../assets/years.mp3';
// ────────────────────────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [nay1, nay2, nay3, nay4, nay5, nay6, nay7, nay8, nay9];

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
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
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
const GoldenStar = ({ size = 24 }) => (
  <img src={estrella2} alt=""
    style={{ width: size, height: size, objectFit: 'contain' }} />
);

// ── DIVIDER ──────────────────────────────────────────────────────────────────
const GoldDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '20px auto', maxWidth: 200, width: '100%' }}>
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
    <GoldenStar size={16} />
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
  </div>
);

// ── ITINERARY ICON ────────────────────────────────────────────────────────────
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

// ── SWIPE GALLERY ─────────────────────────────────────────────────────────────
const SwipeGallery = ({ photos }) => {
  const [current, setCurrent]     = useState(0);
  const [dragX, setDragX]         = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [animDir, setAnimDir]     = useState(null);
  const [animating, setAnimating] = useState(false);
  const startX = useRef(null);
  const hasDragged = useRef(false);

  const GOLD       = '#C9A84C';
  const GOLD_LIGHT = '#F0D060';
  const CARD_W = 280;
  const CARD_H = 380;
  const PEEK_W = 48;
  const RADIUS = 18;

  const goTo = (dir) => {
    if (animating) return;
    const next = current + dir;
    if (next < 0 || next >= photos.length) return;
    setAnimDir(dir > 0 ? 'left' : 'right');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimDir(null);
      setAnimating(false);
      setDragX(0);
    }, 320);
  };

  // ── Touch handlers ────────────────────────────────────────────────────────
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    hasDragged.current = false;
    setIsDragging(true);
  };
  const onTouchMove = (e) => {
    if (!isDragging || startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    setDragX(dx);
  };
  const onTouchEnd = () => {
    if (Math.abs(dragX) > 60) {
      goTo(dragX < 0 ? 1 : -1);
    } else {
      setDragX(0);
    }
    setIsDragging(false);
    startX.current = null;
  };

  // ── Mouse drag handlers ───────────────────────────────────────────────────
  const onMouseDown = (e) => {
    startX.current = e.clientX;
    hasDragged.current = false;
    setIsDragging(true);
  };
  const onMouseMove = (e) => {
    if (!isDragging || startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    setDragX(dx);
  };
  const onMouseUp = () => {
    if (Math.abs(dragX) > 60) {
      goTo(dragX < 0 ? 1 : -1);
    } else {
      setDragX(0);
    }
    setIsDragging(false);
    startX.current = null;
  };

  const prevIdx = current - 1;
  const nextIdx = current + 1;

  const getCardTransform = () => {
    if (animating) {
      return animDir === 'left' ? 'translateX(-110%)' : 'translateX(110%)';
    }
    const drag = isDragging ? dragX * 0.85 : 0;
    return `translateX(${drag}px)`;
  };

  // ── Tap zone button style ─────────────────────────────────────────────────
  const tapBtnBase = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '38%',
    zIndex: 20,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  };

  const arrowStyle = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'rgba(10,8,0,0.55)',
    border: `1px solid ${GOLD}66`,
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: GOLD,
    fontSize: 16,
    flexShrink: 0,
    boxShadow: `0 2px 12px rgba(0,0,0,0.5)`,
    transition: 'background 0.2s, transform 0.15s',
    pointerEvents: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, userSelect: 'none' }}>

      {/* Stage */}
      <div
        style={{ position: 'relative', width: CARD_W + PEEK_W * 2, height: CARD_H, overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* PREV preview — top-left peek */}
        {prevIdx >= 0 && (
          <div style={{
            position: 'absolute', left: 0, top: -12,
            width: CARD_W * 0.75, height: CARD_H * 0.75,
            borderRadius: RADIUS, overflow: 'hidden',
            opacity: 0.45,
            transform: 'scale(0.78) translateX(-36px) rotate(-6deg)',
            transformOrigin: 'top left',
            zIndex: 1,
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}>
            <img src={photos[prevIdx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        )}

        {/* NEXT preview — top-right peek */}
        {nextIdx < photos.length && (
          <div style={{
            position: 'absolute', right: 0, top: -12,
            width: CARD_W * 0.75, height: CARD_H * 0.75,
            borderRadius: RADIUS, overflow: 'hidden',
            opacity: 0.45,
            transform: 'scale(0.78) translateX(36px) rotate(6deg)',
            transformOrigin: 'top right',
            zIndex: 1,
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}>
            <img src={photos[nextIdx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        )}

        {/* MAIN CARD */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: CARD_W, height: CARD_H,
          transform: `translate(-50%, -50%) ${getCardTransform()}`,
          transition: animating ? 'transform 0.32s cubic-bezier(0.4,0,0.2,1)' : isDragging ? 'none' : 'transform 0.25s ease',
          borderRadius: RADIUS, overflow: 'hidden',
          zIndex: 10,
          boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.35)',
        }}>
          <img
            src={photos[current]}
            alt={`Nayely foto ${current + 1}`}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', pointerEvents: 'none' }}
          />
          {/* Vignette bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(5,0,5,0.65), transparent)', pointerEvents: 'none' }} />
          {/* Counter badge */}
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)',
            padding: '4px 12px', borderRadius: 20, backdropFilter: 'blur(4px)',
            pointerEvents: 'none',
          }}>
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* TAP ZONE — IZQUIERDA */}
        {prevIdx >= 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); if (!hasDragged.current) goTo(-1); }}
            style={{ ...tapBtnBase, left: 0, justifyContent: 'flex-start', paddingLeft: 10 }}
            aria-label="Foto anterior"
          >
            <div style={arrowStyle}>‹</div>
          </button>
        )}

        {/* TAP ZONE — DERECHA */}
        {nextIdx < photos.length && (
          <button
            onClick={(e) => { e.stopPropagation(); if (!hasDragged.current) goTo(1); }}
            style={{ ...tapBtnBase, right: 0, justifyContent: 'flex-end', paddingRight: 10 }}
            aria-label="Foto siguiente"
          >
            <div style={arrowStyle}>›</div>
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {photos.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.3)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Swipe hint */}
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.35em', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase', margin: 0 }}>
        ← Desliza o toca para navegar →
      </p>

      {/* Volver al inicio — solo aparece en la última foto */}
      {current === photos.length - 1 && (
        <button
          onClick={() => { setCurrent(0); setDragX(0); }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #8B6914, #C9A84C, #f0d060, #C9A84C, #8B6914)',
            backgroundSize: '200% auto',
            color: '#0A0800',
            border: 'none',
            borderRadius: 2,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(201,168,76,0.45)',
            animation: 'fadeInUp 0.4s ease',
          }}
        >
          Volver al inicio
        </button>
      )}
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const NayelyGuadalupeLayout = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  const [scrollY, setScrollY]           = useState(0);

  const fechaXV = '2026-09-05T14:30:00';

  const handleOpen = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setHideEnvelope(true), 1400);
  };

  // Autoplay música al abrir el sobre
  useEffect(() => {
    if (!envelopeOpen) return;
    const audio = new Audio(yearsAudio);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, [envelopeOpen]);

  useEffect(() => {
    if (!envelopeOpen) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [envelopeOpen]);

  // ── Paleta dorada ────────────────────────────────────────────────────────
  const BG         = '#0A0800';
  const GOLD       = '#C9A84C';
  const GOLD_LIGHT = '#F0D060';
  const GOLD_DIM   = 'rgba(201,168,76,0.18)';

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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Sacramento&display=swap');

        .gold-text {
          background: linear-gradient(135deg, #a07830 0%, #C9A84C 30%, #f5e070 60%, #C9A84C 80%, #a07830 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .float-star   { animation: floatStar 4s ease-in-out infinite; }
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
          <img src={cascada} alt=""
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 700, opacity: 0.55, pointerEvents: 'none', mixBlendMode: 'screen' }} />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <img src={estrella1} alt="" className="float-star"
              style={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.8))' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, opacity: envelopeOpen ? 0 : 1, transition: 'opacity 0.4s' }}
              className="shimmer-anim">
              Toca para abrir tu invitación
            </p>
          </div>

          <img src={diamantina} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'screen' }} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${scrollY * 0.25}px)` }}>
          <img src={heroPhoto} alt="Nayely Guadalupe"
            style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,0,0.3) 0%, rgba(10,8,0,0.15) 40%, rgba(10,8,0,0.75) 85%, #0A0800 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        </div>

        <img src={cascada} alt=""
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, opacity: 0.45, pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 2 }} />

        <img src={estrella2} alt=""
          style={{ position: 'absolute', top: 32, left: 20, width: 50, opacity: 0.7, pointerEvents: 'none', zIndex: 2, filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.6))' }} className="float-star" />
        <img src={estrella1} alt=""
          style={{ position: 'absolute', top: 20, right: 18, width: 64, opacity: 0.65, pointerEvents: 'none', zIndex: 2, filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.6))', animationDelay: '1.5s' }} className="float-star" />

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

          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: 'clamp(80px, 22vw, 150px)',
            lineHeight: 1, marginBottom: 8,
            background: 'linear-gradient(135deg, #a07830 0%, #C9A84C 25%, #f5e070 55%, #C9A84C 78%, #a07830 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 12px rgba(201,168,76,0.4))',
          }}>
            Nayely Guadalupe
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '12px auto', maxWidth: 280 }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <img src={estrella2} alt="" style={{ width: 20, height: 20 }} />
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.35em', color: '#EDE0C4', marginBottom: 4 }}>
            SÁBADO • 5 DE SEPTIEMBRE
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 22, letterSpacing: '0.2em', color: GOLD }}>
            2026
          </p>
        </div>

        <img src={doradoMancha} alt=""
          style={{ position: 'absolute', bottom: -20, left: -20, width: 200, opacity: 0.35, pointerEvents: 'none', zIndex: 2, mixBlendMode: 'screen' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. FRASE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <img src={diamantina} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <FadeIn>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 64, color: GOLD, lineHeight: 0.6, marginBottom: 16, opacity: 0.6 }}>"</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(16px, 4.5vw, 20px)',
              fontStyle: 'italic', fontWeight: 300, lineHeight: 1.8,
              color: '#EDE0C4', letterSpacing: '0.02em',
            }}>
              Hay momentos que la vida guarda en el corazón para siempre. Quiero que estés en uno de los más importantes de mi historia: el día que cumplo quince años.
            </p>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 38, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Nayely Guadalupe
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. PAPÁS Y PADRINOS
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
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

                {/* Papás */}
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>
                  Sus Padres
                </p>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em', marginBottom: 6 }}>
                  Cristian Medina
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: GOLD, letterSpacing: '0.3em', marginBottom: 6 }}>&amp;</p>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em', marginBottom: 24 }}>
                  Irene Castillo
                </p>

                <GoldDivider />

                {/* Padrinos */}
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>
                  Sus Padrinos
                </p>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em', marginBottom: 6 }}>
                  Rogelio Medina
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: GOLD, letterSpacing: '0.3em', marginBottom: 6 }}>&amp;</p>
                <p style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', letterSpacing: '0.03em' }}>
                  Lilia Mulgado
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
        <img src={diamantina} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06, pointerEvents: 'none', mixBlendMode: 'screen' }} />
        <img src={estrella2} alt=""
          style={{ position: 'absolute', top: 16, left: 16, width: 36, opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'screen' }} className="float-star" />
        <img src={estrella2} alt=""
          style={{ position: 'absolute', bottom: 16, right: 20, width: 28, opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'screen', animationDelay: '2s' }} className="float-star" />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 24 }}>
              ¡Aparta la fecha! · La magia comienza en
            </p>
            <div style={{ color: GOLD_LIGHT, filter: 'drop-shadow(0 0 18px rgba(201,168,76,0.4))' }}>
              <Countdown targetDate={fechaXV} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. GALERÍA SWIPE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${GOLD}22` }}>
        <img src={doradoTop} alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0.18, pointerEvents: 'none', mixBlendMode: 'screen' }} />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
                Una historia en imágenes
              </p>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 26, color: GOLD_LIGHT, letterSpacing: '0.05em' }}>
                Creciendo hacia los XV
              </h2>
              <GoldDivider />
            </div>

            <SwipeGallery photos={GALLERY_PHOTOS} />
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. ITINERARIO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <FadeIn>
          <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
                El Programa
              </p>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 28, color: GOLD_LIGHT, letterSpacing: '0.05em' }}>
                Itinerario
              </h2>
              <GoldDivider />
            </div>

            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${GOLD}88, ${GOLD}88, transparent)` }} />

              {[
                { hour: '14:30', label: 'Misa',          desc: 'Templo del Puente de Guadalupe', emoji: '⛪' },
                { hour: '16:00', label: 'Comida',         desc: 'La Escondida #500 · Rancho El Carmen', emoji: '🍽️' },
                { hour: '18:30', label: 'Vals y Brindis', desc: 'El momento más esperado de la noche', emoji: '🥂' },
                { hour: '20:00', label: '¡A Bailar!',     desc: 'Pista abierta · ¡Prepara los pasos!', emoji: '💃' },
                { hour: '00:00', label: 'Hasta Pronto',   desc: '¡Gracias por acompañarnos!', emoji: '✨' },
              ].map((item, i) => (
                <FadeIn delay={i * 100} key={i}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 36, position: 'relative' }}>
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
          7. LOCACIONES
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '20px 24px 80px', position: 'relative' }}>
        <FadeIn>
          <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 2 }}>

            {/* Ceremonia */}
            <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
              <div style={topBarStyle} />
              <div style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⛪</div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                  Ceremonia Religiosa
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', marginBottom: 4 }}>
                  Templo del Puente de Guadalupe
                </h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.2em', color: GOLD_LIGHT, marginBottom: 6 }}>14:30 HRS</p>
                <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic', marginBottom: 20 }}>Irapuato, Guanajuato</p>
                <MapButton
                  location="https://share.google/Sj5rf3VH4E7xu2y8R"
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
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                  Recepción
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 300, color: '#EDE0C4', marginBottom: 4 }}>
                  La Escondida #500
                </h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.2em', color: GOLD_LIGHT, marginBottom: 6 }}>16:00 HRS</p>
                <p style={{ fontSize: 13, color: '#7a6a50', fontStyle: 'italic', marginBottom: 8 }}>
                  Rancho El Carmen · Irapuato, Gto
                </p>
                <p style={{ fontSize: 12, color: '#4a3f28', fontStyle: 'italic' }}>
             
                </p>
              </div>
              <div style={topBarStyle} />
            </div>

          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. DRESS CODE
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
                  FORMAL / CASUAL
                </p>

                <GoldDivider />

                <div style={{
                  background: '#c7a45e',
                  borderRadius: 4,
                  border: `1px solid ${GOLD}55`,
                  padding: '28px 20px 20px',
                  marginBottom: 20,
                }}>
                  <img src={dresscode} alt="Código de vestimenta formal"
                    style={{ width: 130, objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#000000', marginTop: 14, marginBottom: 0 }}>
                    Damas &amp; Caballeros
                  </p>
                </div>

                <div style={{ background: GOLD_DIM, border: `1px solid ${GOLD}33`, borderRadius: 2, padding: '18px 20px' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
                    Color Reservado
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                    {['#C0182A', '#e03050', '#8B0000', '#d94060', '#f06070'].map((c, i) => (
                      <div key={i} style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: c, border: '2px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: '#c8b080', lineHeight: 1.7, fontStyle: 'italic' }}>
                    Todos los tonos <strong style={{ color: GOLD_LIGHT }}>rojos</strong> están reservados exclusivamente para la festejada.
                  </p>
                </div>

                <GoldDivider />
              </div>
              <div style={topBarStyle} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER NOMBRE
          ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '40px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}15` }}>
        <img src={doradoFoot} alt=""
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', opacity: 0.2, pointerEvents: 'none', mixBlendMode: 'screen' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Sacramento', cursive", fontSize: 52, color: GOLD, opacity: 0.5, marginBottom: 4 }}>
            Nayely Guadalupe
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.4em', color: '#4a3f28', textTransform: 'uppercase' }}>
            XV Años · 05 · 09 · 2026
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER FIESTAPP
          ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '48px 24px 120px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${GOLD}15` }}>
        <div style={{ position: 'relative', zIndex: 2 }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28, maxWidth: 200, margin: '0 auto 28px' }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${GOLD}44)` }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: `${GOLD}66` }} />
            <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${GOLD}44)` }} />
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '', marginBottom: 14 }}>
            Hecho con
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <img src={logoGlitter} alt="Fiestapp"
              style={{ width: 36, height: 36, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.5))' }} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 14, letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase' }}>
              Fiestapp
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <a href="https://www.instagram.com/fiestappds/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}44)`, border: `1px solid ${GOLD}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill={GOLD} stroke="none"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '0.2em', color: '#5a4f38', textTransform: 'uppercase' }}>Instagram</span>
            </a>

            <a href="https://www.facebook.com/profile.php?id=61577438272854" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}44)`, border: `1px solid ${GOLD}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={GOLD}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '0.2em', color: '#5a4f38', textTransform: 'uppercase' }}>Facebook</span>
            </a>
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: '0.25em', color: '#cac4bb', textTransform: 'uppercase', marginTop: 20 }}>
            Crea tu invitación digital · fiestapp.com.mx
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE RSVP
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', bottom: 28, right: 20, zIndex: 50 }}>
       
      </div>

    </div>
  );
};

export default NayelyGuadalupeLayout;