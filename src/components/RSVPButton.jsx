import { useState } from 'react';

const RSVPButton = ({ phone, eventName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [acompanantes, setAcompanantes] = useState('1');
  
  // INICIALIZACIÓN PEREZOSA: Leemos la URL una sola vez al cargar el componente.
  // ¡Adiós useEffect, adiós renderizados dobles y adiós error!
  const [pasesFijos] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('pases');
  });

  // --- BOTÓN CERRADO (ESTADO INICIAL) ---
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-8 py-4 text-[10px] md:text-xs tracking-widest uppercase font-black shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300 flex items-center gap-3 border border-stone-800"
      >
        <span>RSVP</span>
        <div className="w-[1px] h-4 bg-stone-600"></div>
        <span>Confirmar</span>
      </button>
    );
  }

  // --- WIDGET ABIERTO: MODALIDAD 2 (PASES FIJOS / MODO VIP) ---
  if (pasesFijos) {
    const mensajeVIP = `Hola, confirmo mi asistencia a ${eventName} con mi pase VIP para ${pasesFijos} personas.`;
    const linkVIP = `https://wa.me/${phone}?text=${encodeURIComponent(mensajeVIP)}`;

    return (
      <div className="bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-black max-w-sm w-[90vw] animate-fiestapp-entry">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-black font-black uppercase tracking-[0.3em] text-xs">Pase Exclusivo</h3>
          <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-black font-bold text-xl leading-none">&times;</button>
        </div>
        
        <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mb-2">Válido estrictamente para</p>
        <p className="text-5xl font-serif text-black mb-8">{pasesFijos} <span className="text-lg font-sans font-bold uppercase tracking-widest text-stone-400">Personas</span></p>
        
        <a 
          href={linkVIP} 
          target="_blank" 
          rel="noreferrer" 
          className="block text-center w-full bg-black text-white px-6 py-4 text-[10px] tracking-widest uppercase font-black hover:bg-stone-800 transition-colors"
        >
          Confirmar Vía WhatsApp
        </a>
      </div>
    );
  }

  // --- WIDGET ABIERTO: MODALIDAD 1 (FORMULARIO LIBRE) ---
  const mensajeLibre = `Hola, soy ${nombre}. Confirmo mi asistencia a ${eventName} para ${acompanantes} personas.`;
  const linkLibre = `https://wa.me/${phone}?text=${encodeURIComponent(mensajeLibre)}`;

  return (
    <div className="bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-black max-w-sm w-[90vw] animate-fiestapp-entry">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-black font-black uppercase tracking-[0.3em] text-xs">Confirmación</h3>
        <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-black font-bold text-xl leading-none">&times;</button>
      </div>
      
      <div className="space-y-6 mb-8 text-left">
        <div>
          <label className="block text-[9px] uppercase tracking-widest font-bold text-stone-500 mb-2">Nombre / Apellido</label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Familia Rodríguez" 
            className="w-full border-b-2 border-stone-200 focus:border-black outline-none py-2 text-sm font-bold bg-transparent transition-colors placeholder:font-light"
          />
        </div>
        <div>
          <label className="block text-[9px] uppercase tracking-widest font-bold text-stone-500 mb-2">Personas Asistiendo</label>
          <select 
            value={acompanantes}
            onChange={(e) => setAcompanantes(e.target.value)}
            className="w-full border-b-2 border-stone-200 focus:border-black outline-none py-2 text-sm font-bold bg-transparent transition-colors cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
            ))}
          </select>
        </div>
      </div>

      <a 
        href={nombre.trim() ? linkLibre : '#'} 
        target={nombre.trim() ? '_blank' : '_self'}
        rel="noreferrer" 
        onClick={(e) => {
          if (!nombre.trim()) {
            e.preventDefault();
            alert('Por favor, ingresa tu nombre para poder confirmar.');
          }
        }}
        className={`block text-center w-full px-6 py-4 text-[10px] tracking-widest uppercase font-black transition-colors ${
          nombre.trim() ? 'bg-black text-white hover:bg-stone-800' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Enviar Datos a WhatsApp
      </a>
    </div>
  );
};

export default RSVPButton;