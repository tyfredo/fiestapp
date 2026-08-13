import React, { useState, useEffect, useRef } from 'react';
import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

// ── ASSETS ───────────────────────────────────────────────────────────────────
import irmaPhoto      from '../assets/irma.jpeg';
import background2    from '../assets/background2.png';
import decoImg        from '../assets/deco.png';
import cincuentaImg   from '../assets/cincuenta.png';
import esq1Img        from '../assets/esq1.png';
import esq2Img        from '../assets/esq2.png';
import esq3Img        from '../assets/esq3.png';
import esq4Img        from '../assets/esq4.png';
import splashrojo1    from '../assets/splashrojo1.png';
import splashrojo2    from '../assets/splashrojo2.png';
import splashverde1   from '../assets/splashverde1.png';
import splashverde2   from '../assets/splashverde2.png';
import logoGlitter    from '../assets/logomexa.png';
import banderinAImg   from '../assets/a.png';
import banderinIImg   from '../assets/i.png';
import banderinRImg   from '../assets/r.png';
import banderinMImg   from '../assets/m.png';
// ─────────────────────────────────────────────────────────────────────────────

const V   = '#006847';
const R   = '#CE1126';
const TX  = '#1A1A1A';
const TX2 = '#444444';
const BG  = '#EDE8DC';

// ── FADE IN ON SCROLL ────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0 }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} style={{
      transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
    }}>
      {children}
    </div>
  );
};

// ── PAPEL PICADO IRMA ─────────────────────────────────────────────────────────
const PapelPicadoIRMA = () => {
  const flags = [
    { src: banderinIImg, key: 'I' },
    { src: banderinRImg, key: 'R' },
    { src: banderinMImg, key: 'M' },
    { src: banderinAImg, key: 'A' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', paddingTop: 6 }}>
      <div style={{
        position: 'absolute', top: 20, left: '50%',
        transform: 'translateX(-50%)',
        width: 290, height: 1.5,
        background: `linear-gradient(90deg, transparent, ${V}, #fff, ${R}, transparent)`,
        zIndex: 1,
      }} />
      {flags.map((f, i) => (
        <img key={f.key} src={f.src} alt={f.key} style={{
          width: 62, height: 74, objectFit: 'contain',
          animation: `wave ${1.7 + (i % 2) * 0.35}s ease-in-out ${i * 0.14}s infinite`,
          transformOrigin: 'top center',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))',
          zIndex: 2, position: 'relative',
        }} />
      ))}
    </div>
  );
};

// ── TIRA TRICOLOR ─────────────────────────────────────────────────────────────
const Strip = () => (
  <div style={{ height: 5, display: 'flex' }}>
    <div style={{ flex: 1, background: V }} />
    <div style={{ flex: 1, background: '#FFFFFF' }} />
    <div style={{ flex: 1, background: R }} />
  </div>
);

// ── DIVIDER DECO ──────────────────────────────────────────────────────────────
const DecoDivider = ({ small = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: small ? '16px auto' : '22px auto' }}>
    <img src={decoImg} alt="" style={{ width: small ? 80 : 110, objectFit: 'contain', opacity: 0.9 }} />
  </div>
);

// ── SECTION WRAPPER ───────────────────────────────────────────────────────────
const Section = ({ children, bg = '#FFFDF8', style = {} }) => (
  <section style={{
    padding: '68px 28px',
    background: bg,
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }}>
    {children}
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
const IrmaLayout = () => {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const heroRef = useRef();

  const fechaCumple = '2026-09-04T16:00:00';

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setHidden(true), 1400);
  };

  // Efecto parallax / fade en el hero al scrollear
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Empieza a desvanecerse cuando el hero empieza a salir por arriba
      const ratio = Math.max(0, Math.min(1, (rect.bottom) / vh));
      setHeroOpacity(ratio);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TX, fontFamily: "'Lato', sans-serif", overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lato:wght@300;400;700;900&family=Dancing+Script:wght@600;700&family=Bebas+Neue&display=swap');

        @keyframes wave {
          0%, 100% { transform: rotate(-6deg); }
          50%       { transform: rotate(6deg);  }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1;    }
        }
        @keyframes popIn {
          0%   { transform: scale(0.35); opacity: 0; }
          70%  { transform: scale(1.04); }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .btn-verde {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${V};
          color: #fff; font-family: 'Lato', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 14px 34px; border: none; border-radius: 50px;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,104,71,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-verde:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,104,71,0.42); }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          PANTALLA DE ENTRADA
          ═══════════════════════════════════════════════════════════════ */}
      {!hidden && (
        <div onClick={handleOpen} style={{
          position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
          backgroundImage: `url(${background2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 12,
          transition: 'transform 1.3s cubic-bezier(0.86,0,0.07,1)',
          transform: opened ? 'translateY(-100%)' : 'translateY(0)',
          overflow: 'hidden',
        }}>
          <Strip />
          <div style={{ position: 'absolute', top: 5, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 5 }}>
            <PapelPicadoIRMA />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <Strip />
          </div>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '80px 24px 60px' }}>
            <p style={{
              fontFamily: "'Lato', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.55em', textTransform: 'uppercase',
              color: V, animation: 'shimmer 2.2s ease-in-out infinite',
              marginBottom: 8,
            }}>
              ✦ Tienes una invitación ✦
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px,5vw,28px)',
              fontStyle: 'italic', color: TX, marginBottom: 6,
            }}>
              ¡Toca para abrirla!
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — VISTA PRINCIPAL (igual a la imagen de referencia)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100dvh',
          backgroundImage: `url(${background2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'local',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Todo el contenido del hero se desvanece al scrollear */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: heroOpacity,
          transition: 'opacity 0.05s linear',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>

          {/* ── ESQUINAS ──────────────────────────────────────────── */}
          <img src={esq1Img} alt="" style={{ position: 'absolute', top: 0,    left: 0,  width: 130, pointerEvents: 'none' }} />
          <img src={esq2Img} alt="" style={{ position: 'absolute', top: 0,    right: 0, width: 130, pointerEvents: 'none' }} />
          <img src={esq3Img} alt="" style={{ position: 'absolute', bottom: 0, left: 0,  width: 130, pointerEvents: 'none' }} />
          <img src={esq4Img} alt="" style={{ position: 'absolute', bottom: 0, right: 0, width: 130, pointerEvents: 'none' }} />

          {/* ── CONTENIDO CENTRAL ─────────────────────────────────── */}
          <div style={{
            textAlign: 'center',
            padding: '0 40px',
            opacity: opened ? 1 : 0,
            transform: opened ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
            width: '100%',
            maxWidth: 480,
          }}>

            {/* FELIZ + splashes rojos */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 0 }}>
              <img src={splashrojo1} alt="" style={{ width: 28, objectFit: 'contain' }} />
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(18px, 5vw, 28px)',
                letterSpacing: '0.18em',
                color: TX,
                margin: 0,
              }}>
                FELIZ
              </p>
              <img src={splashrojo2} alt="" style={{ width: 28, objectFit: 'contain' }} />
            </div>

            {/* CUMPLE */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(64px, 18vw, 110px)',
              letterSpacing: '0.06em',
              color: TX,
              lineHeight: 0.9,
              margin: '2px 0 0',
            }}>
              CUMPLE
            </h1>

            {/* IRMA + 50 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(64px, 18vw, 110px)',
                letterSpacing: '0.06em',
                color: TX,
                lineHeight: 0.9,
                margin: 0,
              }}>
                IRMA
              </h1>
              <img src={cincuentaImg} alt="50"
                style={{
                  width: 'clamp(54px, 14vw, 88px)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                  marginTop: 4,
                }}
              />
            </div>

            {/* 04 SEPT + splashes verdes */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0 6px' }}>
              <img src={splashverde1} alt="" style={{ width: 32, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(38px, 10vw, 58px)',
                  letterSpacing: '0.08em',
                  color: TX,
                  lineHeight: 1,
                  margin: 0,
                }}>
                  04
                </p>
                <p style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(20px, 5vw, 30px)',
                  letterSpacing: '0.2em',
                  color: TX,
                  lineHeight: 1,
                  margin: 0,
                }}>
                  SEPT
                </p>
              </div>
              <img src={splashverde2} alt="" style={{ width: 32, objectFit: 'contain' }} />
            </div>

            {/* A partir de las 4 p.m. */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(15px, 4vw, 20px)',
              fontStyle: 'italic',
              color: TX,
              margin: '10px 0 6px',
            }}>
              A partir de las 4 p.m.
            </p>

            {/* Frase */}
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(11px, 3vw, 14px)',
              color: TX2,
              margin: '0 0 14px',
              letterSpacing: '0.02em',
            }}>
              La vida se vive mejor cuando se comparte.
            </p>

            {/* Deco central */}
            <DecoDivider />

            {/* ¡TE ESPERAMOS! */}
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(16px, 4.5vw, 22px)',
              letterSpacing: '0.12em',
              color: TX,
              margin: '4px 0 0',
            }}>
              ¡TE ESPERAMOS!
            </p>

          </div>
        </div>

        {/* Indicador scroll */}
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          opacity: heroOpacity * (opened ? 1 : 0),
          transition: 'opacity 0.4s',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          pointerEvents: 'none',
          zIndex: 5,
        }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: TX2, margin: 0 }}>
            Desliza para ver más
          </p>
          <div style={{
            width: 1.5, height: 32,
            background: `linear-gradient(to bottom, ${TX2}, transparent)`,
          }} />
        </div>
      </section>

      <Strip />

      {/* ═══════════════════════════════════════════════════════════════
          2. FOTO DE IRMA
          ═══════════════════════════════════════════════════════════════ */}
      <Section bg="#FFFDF8">
        <FadeIn>
          <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>

            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase', color: V, marginBottom: 22 }}>
             - I R M A -
            </p>

            {/* Marco tricolor foto */}
            <div style={{
              display: 'inline-block',
              padding: 4,
              background: `linear-gradient(160deg, ${V} 0%, #fff 50%, ${R} 100%)`,
              borderRadius: 14,
              boxShadow: '0 10px 36px rgba(0,0,0,0.13)',
            }}>
              <div style={{ borderRadius: 11, overflow: 'hidden', background: '#fff' }}>
                <img src={irmaPhoto} alt="Irma"
                  style={{ width: 260, height: 320, objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
            </div>

            <DecoDivider />

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontStyle: 'italic',
              color: TX,
              lineHeight: 1.55,
            }}>
              ¡50 años de una mujer<br />
              <span style={{ color: V }}>absolutamente increíble!</span>
            </p>

          </div>
        </FadeIn>
      </Section>

      <Strip />

      {/* ═══════════════════════════════════════════════════════════════
          3. CUENTA REGRESIVA
          ═══════════════════════════════════════════════════════════════ */}
      <Section bg={BG} style={{ textAlign: 'center' }}>
        {/* Esquinas decorativas sutiles */}
        <img src={esq1Img} alt="" style={{ position: 'absolute', top: 0, left: 0, width: 80, opacity: 0.35, pointerEvents: 'none' }} />
        <img src={esq2Img} alt="" style={{ position: 'absolute', top: 0, right: 0, width: 80, opacity: 0.35, pointerEvents: 'none' }} />
        <img src={esq3Img} alt="" style={{ position: 'absolute', bottom: 0, left: 0, width: 80, opacity: 0.35, pointerEvents: 'none' }} />
        <img src={esq4Img} alt="" style={{ position: 'absolute', bottom: 0, right: 0, width: 80, opacity: 0.35, pointerEvents: 'none' }} />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase', color: V, marginBottom: 10 }}>
              Cuenta Regresiva
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(20px, 5.5vw, 28px)',
              fontStyle: 'italic',
              color: TX,
              marginBottom: 28,
            }}>
              ¡Faltan para la fiesta!
            </h2>
            <div style={{ color: V }}>
              <Countdown targetDate={fechaCumple} />
            </div>
          </div>
        </FadeIn>
      </Section>

      <Strip />

      {/* ═══════════════════════════════════════════════════════════════
          4. UBICACIÓN
          ═══════════════════════════════════════════════════════════════ */}
      <Section bg="#FFFDF8" style={{ textAlign: 'center' }}>
        <FadeIn>
          <div style={{ maxWidth: 460, margin: '0 auto' }}>

            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase', color: V, marginBottom: 10 }}>
              Lugar del Festejo
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(20px, 5.5vw, 28px)',
              fontStyle: 'italic',
              color: TX,
              marginBottom: 10,
              lineHeight: 1.3,
            }}>
              San Vicente de Juárez
            </h2>

            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, fontWeight: 300, color: TX2, lineHeight: 1.85, marginBottom: 16 }}>
              C. 2 de Mayo 31<br />
              62724 San Vicente de Juárez, Mor.
            </p>

            {/* Píldoras fecha y hora */}
            <div style={{ display: 'inline-flex', gap: 0, marginBottom: 28 }}>
              <div style={{ padding: '6px 16px', background: V, borderRadius: '20px 0 0 20px' }}>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>
                  Viernes 4 Sept
                </span>
              </div>
              <div style={{ padding: '6px 16px', background: R, borderRadius: '0 20px 20px 0' }}>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>
                  4:00 PM
                </span>
              </div>
            </div>

            <br />

            <MapButton
              location="https://maps.app.goo.gl/wi4o2gKqAtp8F69AA"
              label="📍 Cómo llegar"
              className="btn-verde"
            />
          </div>
        </FadeIn>
      </Section>

      <Strip />

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      <footer style={{
        padding: '56px 28px 110px',
        backgroundImage: `url(${background2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Esquinas deco footer */}
        <img src={esq3Img} alt="" style={{ position: 'absolute', bottom: 0, left: 0, width: 100, opacity: 0.5, pointerEvents: 'none' }} />
        <img src={esq4Img} alt="" style={{ position: 'absolute', bottom: 0, right: 0, width: 100, opacity: 0.5, pointerEvents: 'none' }} />
        <img src={esq1Img} alt="" style={{ position: 'absolute', top: 0, left: 0, width: 100, opacity: 0.5, pointerEvents: 'none' }} />
        <img src={esq2Img} alt="" style={{ position: 'absolute', top: 0, right: 0, width: 100, opacity: 0.5, pointerEvents: 'none' }} />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2 }}>

            {/* Papel picado IRMA */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <PapelPicadoIRMA />
            </div>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 8vw, 44px)',
              letterSpacing: '0.1em',
              color: TX,
              marginBottom: 6,
            }}>
              ¡NOS VEMOS EL 4 DE SEPT!
            </h2>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18, fontStyle: 'italic', color: TX2,
              marginBottom: 8,
            }}>
              A partir de las 4:00 p.m.
            </p>

            <DecoDivider small />

            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 900, fontSize: 16,
              letterSpacing: '0.12em', color: TX,
              marginBottom: 32,
            }}>
              ¡TE ESPERAMOS!
            </p>

            {/* Banderita tricolor */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 32 }}>
              <div style={{ width: 30, height: 4, background: V, borderRadius: '3px 0 0 3px' }} />
              <div style={{ width: 30, height: 4, background: '#fff', outline: '1px solid #ddd' }} />
              <div style={{ width: 30, height: 4, background: R, borderRadius: '0 3px 3px 0' }} />
            </div>

            {/* Fiestapp branding */}
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>
              Hecho con
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
              <img src={logoGlitter} alt="Fiestapp" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase' }}>
                Fiestapp
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 14 }}>
              <a href="https://www.instagram.com/fiestappds/" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#555" stroke="none"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 7, letterSpacing: '0.12em', color: '#777', textTransform: 'uppercase' }}>Instagram</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577438272854" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#555">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 7, letterSpacing: '0.12em', color: '#777', textTransform: 'uppercase' }}>Facebook</span>
              </a>
            </div>

            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 7, letterSpacing: '0.2em', color: '#999', textTransform: 'uppercase' }}>
              Crea tu invitación digital · fiestapp.com.mx
            </p>
          </div>
        </FadeIn>
      </footer>

      {/* RSVP flotante */}
      
    </div>
  );
};

export default IrmaLayout;