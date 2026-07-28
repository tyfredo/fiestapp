import React, { useState, useEffect, useRef } from 'react';
import RSVPButton from '../components/RSVPButton';

// ── ASSETS ──────────────────────────────────────────────────────────────────
import foto1 from '../assets/sarahi/foto-1.png';       // atardecer con velo
import foto2 from '../assets/sarahi/foto-2.png';        // foto formal novios
import foto3 from '../assets/sarahi/foto-3.png';        // silueta atardecer
import iconIglesia   from '../assets/sarahi/icon-iglesia.png';
import iconRecepcion from '../assets/sarahi/icon-recepcion.png';
import iconCena      from '../assets/sarahi/icon-cena.png';
import iconBaile     from '../assets/sarahi/icon-baile.png';
import iconFiesta    from '../assets/sarahi/icon-fiesta.png';
import iconVals      from '../assets/sarahi/icon-vals.png';
import iconDresscode from '../assets/sarahi/icon-dresscode.png';
import logoFiestapp  from '../assets/logo.png';

// ────────────────────────────────────────────────────────────────────────────

// ── PALETA ───────────────────────────────────────────────────────────────────
const OLIVE       = '#5C6440';
const OLIVE_DARK  = '#454C30';
const OLIVE_LIGHT = '#7C8A57';
const CREAM       = '#F6F2E9';
const CREAM_SOFT  = '#EFEAdd'.replace('dd', 'DC'); // '#EFEADC'
const INK         = '#38392E';

// ── COLORES RECOMENDADOS PARA INVITADOS (unificados, sin terracota ni negro) ──
const COLORES_INVITADOS = [
  { nombre: 'Azul Humo',           hex: '#8FA3B0' },
  { nombre: 'Azul Acero',          hex: '#5C7A93' },
  { nombre: 'Azul Navy',           hex: '#1F2D40' },
  { nombre: 'Verde Oliva',         hex: '#5C6640' },
  { nombre: 'Chocolate',           hex: '#4A342A' },
  { nombre: 'Gris Carbón',         hex: '#4B4B4B' },
  { nombre: 'Vino',                hex: '#5C1E24' },
  { nombre: 'Ciruela Suave',       hex: '#5A4256' },
];

// ── FADE-IN AL HACER SCROLL ───────────────────────────────────────────────────
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
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
      {children}
    </div>
  );
};

// ── DIVISOR DECORATIVO ────────────────────────────────────────────────────────
const Divider = ({ color = OLIVE }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '18px auto', maxWidth: 220 }}>
    <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
    <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${color}`, background: 'transparent' }} />
    <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
);

// ── CUENTA REGRESIVA (estilo dígitos, como en la referencia) ─────────────────
const CountdownRef = ({ targetDate }) => {
  const [t, setT] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) { setT({ dias: 0, horas: 0, min: 0, seg: 0 }); return; }
      setT({
        dias:  Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min:   Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg:   Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: OLIVE, marginBottom: 14 }}>
        Faltan
      </p>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 8vw, 46px)', fontWeight: 600, color: INK, letterSpacing: '0.03em' }}>
        {pad(t.dias)} : {pad(t.horas)} : {pad(t.min)} : {pad(t.seg)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 6vw, 34px)', marginTop: 8 }}>
        {['Días', 'Horas', 'Min', 'Seg'].map((l) => (
          <span key={l} style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a78', width: 46, textAlign: 'center' }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ── CALENDARIO ("EL GRAN DÍA", estilo referencia) ─────────────────────────────
const CalendarioBoda = ({ year, month, day }) => {
  // month: 0-indexed (10 = noviembre)
  const nombreMes = new Date(year, month, 1).toLocaleDateString('es-MX', { month: 'long' }).toUpperCase();
  const primerDiaSemana = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const celdas = [];
  for (let i = 0; i < primerDiaSemana; i++) celdas.push(null);
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d);

  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: OLIVE, textAlign: 'center', marginBottom: 4 }}>
        El Gran Día
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', textAlign: 'center', color: INK, marginBottom: 18 }}>
        {nombreMes} {year}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 }}>
        {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((d) => (
          <div key={d} style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: '0.05em', textAlign: 'center', color: '#9a9a88' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {celdas.map((d, i) => (
          <div key={i} style={{
            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            borderRadius: '50%',
            background: d === day ? OLIVE : 'transparent',
            color: d === day ? CREAM : d ? INK : 'transparent',
            fontWeight: d === day ? 700 : 400,
            border: d === day ? `1px solid ${OLIVE}` : 'none',
          }}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── ÍTEM DE ITINERARIO (icono + hora + texto, estilo línea de tiempo) ────────
const ItinerarioItem = ({ icon, hora, texto, isLast = false }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 54, height: 54, borderRadius: '50%', background: CREAM_SOFT,
        border: `1px solid ${OLIVE}55`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, padding: 10,
      }}>
        <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      {!isLast && <div style={{ width: 1, flex: 1, minHeight: 34, background: `${OLIVE}44`, marginTop: 6 }} />}
    </div>
    <div style={{ paddingTop: 10, paddingBottom: isLast ? 0 : 30 }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: INK, marginBottom: 2 }}>{hora}</p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5a' }}>{texto}</p>
    </div>
  </div>
);

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
const SarahiAndSebastian = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);

  // Viernes 27 de noviembre de 2026, ceremonia 5:00 pm
  const fechaBoda = '2026-11-27T17:00:00';

  const handleOpen = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setHideEnvelope(true), 1300);
  };

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: "'Jost', sans-serif", overflowX: 'hidden', position: 'relative' }}>

      {/* ── GOOGLE FONTS ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        .script-title { font-family: 'Parisienne', cursive; }
        .btn-olive {
          display: inline-block;
          background: ${OLIVE};
          color: ${CREAM};
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 30px;
          border: 1px solid ${OLIVE};
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-olive:hover { background: ${OLIVE_DARK}; }
        .btn-outline-olive {
          display: inline-block;
          background: transparent;
          color: ${OLIVE};
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 11px 28px;
          border: 1px solid ${OLIVE};
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-outline-olive:hover { background: ${OLIVE}; color: ${CREAM}; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          SOBRE / PANTALLA DE ENTRADA
          ═══════════════════════════════════════════════════════════════════ */}
      {!hideEnvelope && (
        <div
          onClick={handleOpen}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
            background: OLIVE,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 1.2s cubic-bezier(0.86,0,0.07,1)',
            transform: envelopeOpen ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {/* Solapa del sobre */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '46%',
            background: `linear-gradient(135deg, ${OLIVE_LIGHT} 0%, ${OLIVE} 55%)`,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transition: 'transform 0.9s cubic-bezier(0.7,0,0.3,1)',
            transform: envelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }} />

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: CREAM, opacity: envelopeOpen ? 0 : 1, transition: 'opacity 0.4s' }}>
            <p className="script-title" style={{ fontSize: 44, marginBottom: 6 }}>Sarahi &amp; Sebastian</p>
            <div style={{ width: 40, height: 1, background: CREAM, margin: '10px auto 16px', opacity: 0.6 }} />
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.85 }}>
              Toca para abrir la invitación
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO / PORTADA
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', background: OLIVE, color: CREAM }}>
        <div style={{
          opacity: envelopeOpen ? 1 : 0,
          transform: envelopeOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.1s ease 0.4s, transform 1.1s ease 0.4s',
        }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.85 }}>
            Nos Casamos
          </p>
          <h1 className="script-title" style={{ fontSize: 'clamp(56px, 15vw, 96px)', lineHeight: 1.05, marginBottom: 6 }}>
            Sarahi
          </h1>
          <p className="script-title" style={{ fontSize: 'clamp(28px, 7vw, 42px)', margin: '4px 0' }}>&amp;</p>
          <h1 className="script-title" style={{ fontSize: 'clamp(56px, 15vw, 96px)', lineHeight: 1.05, marginBottom: 24 }}>
            Sebastian
          </h1>

          <Divider color={CREAM} />

          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 10 }}>
            Viernes 27 de Noviembre
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, letterSpacing: '0.15em', marginTop: 4 }}>
            2026
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. FOTO PRINCIPAL
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '0' }}>
        <img src={foto2} alt="Sarahi y Sebastian" style={{ width: '100%', maxHeight: 640, objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. FRASE
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px 50px', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(17px, 4.2vw, 21px)', color: '#5c5c4d', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            "Dos almas, un mismo camino. Hoy comenzamos juntos la historia más bonita de nuestras vidas."
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. PADRINOS DE VELACIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '10px 24px 70px', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: OLIVE, marginBottom: 14 }}>
            Con la Bendición de Dios y Nuestros Padres
          </p>
          <Divider />
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: OLIVE, marginBottom: 16 }}>
            Padrinos de Velación
          </p>
          <p className="script-title" style={{ fontSize: 30, color: INK }}>Karla Ponce &amp; Arthuro Jaime</p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. CUENTA REGRESIVA + CALENDARIO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 24px', background: CREAM_SOFT, borderTop: `1px solid ${OLIVE}22`, borderBottom: `1px solid ${OLIVE}22` }}>
        <FadeIn>
          <CountdownRef targetDate={fechaBoda} />
        </FadeIn>
        <div style={{ margin: '52px auto 0' }}>
          <FadeIn delay={100}>
            <CalendarioBoda year={2026} month={10} day={27} />
          </FadeIn>
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
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, marginBottom: 2 }}>5:00 pm</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: '0.08em', color: '#6b6b5a', marginBottom: 4 }}>Parroquia Santa Margarita María de Alacoque</p>
            <a href="https://maps.app.goo.gl/vu7biDrRPX3VEKJq7" className="btn-outline-olive" style={{ marginTop: 14 }}>Ver ubicación</a>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ textAlign: 'center' }}>
            <img src={iconRecepcion} alt="" style={{ width: 52, margin: '0 auto 14px' }} />
            <p className="script-title" style={{ fontSize: 32, color: INK, marginBottom: 4 }}>Recepción</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, marginBottom: 2 }}>6:00 pm</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: '0.08em', color: '#6b6b5a', marginBottom: 4 }}>Casa de Eventos Gran Cañada</p>
            <a href="https://maps.app.goo.gl/kn5c2SVXb15afDdt5" className="btn-outline-olive" style={{ marginTop: 14 }}>Ver ubicación</a>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. ITINERARIO DE ACTIVIDADES
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
            <ItinerarioItem icon={iconVals}     hora="8:00 pm"  texto="Primer Baile y Vals" />
            <ItinerarioItem icon={iconBaile}    hora="8:15 pm"  texto="¡A Bailar! Música y Fiesta" />
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
          9. CÓDIGO DE VESTIMENTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '10px 24px 80px', textAlign: 'center' }}>
        <FadeIn>
          <img src={iconDresscode} alt="" style={{ width: 80, margin: '0 auto 18px' }} />
          <p className="script-title" style={{ fontSize: 34, color: INK, marginBottom: 6 }}>Código de Vestimenta</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: OLIVE, marginBottom: 18 }}>
            Elegante
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, color: '#5c5c4d', maxWidth: 420, margin: '0 auto 34px', lineHeight: 1.7 }}>
            Con cariño les pedimos evitar prendas de color blanco y tonos similares.
          </p>

          <div style={{ maxWidth: 460, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a8a78', marginBottom: 18 }}>
              Colores Sugeridos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 22px' }}>
              {COLORES_INVITADOS.map((c) => (
                <div key={c.nombre} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 78 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }} />
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#6b6b5a', marginTop: 8, lineHeight: 1.3 }}>{c.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          10. SUGERENCIA DE REGALO
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 24px', background: OLIVE, color: CREAM, textAlign: 'center' }}>
        <FadeIn>
          <p className="script-title" style={{ fontSize: 32, marginBottom: 14 }}>Sugerencia de Regalo</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.8, opacity: 0.92 }}>
            El mejor regalo es tu presencia, pero si deseas tener un detalle con nosotros, contaremos con lluvia de sobres en el lugar.
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          11. FOTO FINAL + CONFIRMACIÓN
          ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative' }}>
        <img src={foto3} alt="Sarahi y Sebastian" style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }} />
      </section>

      <section style={{ padding: '70px 24px', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: OLIVE, marginBottom: 14 }}>
            Confirmación
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 17, color: '#5c5c4d', maxWidth: 420, margin: '0 auto 22px', lineHeight: 1.8 }}>
            Agradecemos que confirmes tu asistencia antes del 20 de Septiembre.
          </p>
          <Divider />
          <p className="script-title" style={{ fontSize: 30, color: INK, marginTop: 18 }}>¡Esperamos contar con su presencia!</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 15, color: '#8a8a78', marginTop: 6 }}>Muchas gracias</p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER — Fiestapp branding
          ═══════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: '40px 24px 130px', textAlign: 'center', background: CREAM_SOFT, borderTop: `1px solid ${OLIVE}22` }}>
        <p className="script-title" style={{ fontSize: 26, color: OLIVE, opacity: 0.7, marginBottom: 4 }}>Sarahi &amp; Sebastian</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: '#a3a390', textTransform: 'uppercase', marginBottom: 26 }}>
          27 · 11 · 2026
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, maxWidth: 200, margin: '0 auto 22px' }}>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${OLIVE}44)` }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: `${OLIVE}66` }} />
          <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${OLIVE}44)` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <img src={logoFiestapp} alt="Fiestapp" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: OLIVE, textTransform: 'uppercase' }}>Fiestapp</span>
        </div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 8, letterSpacing: '0.2em', color: '#a3a390', textTransform: 'uppercase', marginTop: 12 }}>
          Crea tu invitación digital · fiestapp.com.mx
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE RSVP
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 50 }}>
        <RSVPButton phone="524622711160" eventName="Boda de Sarahi y Sebastian" />
      </div>

    </div>
  );
};

export default SarahiAndSebastian;