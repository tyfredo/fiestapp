import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

const XVLayout = () => {
  const fechaXV = "2026-08-15T21:00:00";

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white font-serif overflow-x-hidden">
      
      {/* 1. PORTADA IMPACTANTE */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070')] bg-cover bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0c]"></div>
        
        <div className="relative z-10 border border-amber-500/30 p-10 md:p-16 backdrop-blur-md bg-black/20 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.15)]">
          <h2 className="text-amber-300 text-lg md:text-xl tracking-[0.5em] mb-4 uppercase font-sans">Mis XV Años</h2>
          <h1 className="text-7xl md:text-9xl font-light mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-500">
            Diana
          </h1>
          <p className="text-amber-100/80 tracking-[0.3em] uppercase text-sm font-sans">15 de Agosto • 2026</p>
        </div>
      </section>

      {/* 2. PADRES Y PADRINOS */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl md:text-4xl text-amber-200 mb-12 font-light italic">Con la bendición de Dios y mis padres</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <p className="uppercase tracking-widest text-amber-500/80 text-xs font-sans mb-4">Mis Padres</p>
            <p className="text-xl text-stone-300">Alejandro Mendoza</p>
            <p className="text-xl text-stone-300">Carolina Herrera</p>
          </div>
          <div className="space-y-2">
            <p className="uppercase tracking-widest text-amber-500/80 text-xs font-sans mb-4">Mis Padrinos</p>
            <p className="text-xl text-stone-300">Roberto Gómez</p>
            <p className="text-xl text-stone-300">Laura Torres</p>
          </div>
        </div>
      </section>

      {/* 3. CUENTA REGRESIVA ESTILO NEÓN/GLAMOUR */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0c] to-[#141418] text-center border-y border-amber-200/10">
        <h3 className="text-amber-200/60 text-sm mb-8 uppercase tracking-[0.4em] font-sans">La noche mágica comienza en:</h3>
        <div className="text-4xl md:text-6xl text-amber-300 font-light drop-shadow-[0_0_15px_rgba(253,230,138,0.3)]">
           <Countdown targetDate={fechaXV} />
        </div>
      </section>

      {/* 4. ITINERARIO (TIMELINE) */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h3 className="text-3xl text-amber-200 mb-16 font-light italic text-center">Itinerario</h3>
        
        <div className="relative border-l border-amber-500/30 ml-4 md:ml-0 md:mx-auto md:max-w-md space-y-12">
          
          {/* Item 1 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[7px] top-1 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <p className="text-amber-400 font-sans tracking-widest text-sm mb-1">19:00 HRS</p>
            <h4 className="text-2xl text-stone-100 mb-2">Ceremonia Religiosa</h4>
            <p className="text-stone-400 text-sm">Parroquia del Señor del Hospital<br/>Salamanca, Gto.</p>
          </div>

          {/* Item 2 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[7px] top-1 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <p className="text-amber-400 font-sans tracking-widest text-sm mb-1">21:00 HRS</p>
            <h4 className="text-2xl text-stone-100 mb-2">Recepción y Cena</h4>
            <p className="text-stone-400 text-sm">Salón de Eventos "El Castillo"<br/>Comienza la llegada de invitados.</p>
          </div>

          {/* Item 3 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[7px] top-1 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <p className="text-amber-400 font-sans tracking-widest text-sm mb-1">22:30 HRS</p>
            <h4 className="text-2xl text-stone-100 mb-2">Vals y Brindis</h4>
            <p className="text-stone-400 text-sm">Acompáñame en este momento tan especial.</p>
          </div>

          {/* Item 4 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[7px] top-1 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <p className="text-amber-400 font-sans tracking-widest text-sm mb-1">23:00 HRS</p>
            <h4 className="text-2xl text-stone-100 mb-2">¡A bailar!</h4>
            <p className="text-stone-400 text-sm">Se abre la pista. ¡Prepara tus mejores pasos!</p>
          </div>

        </div>
      </section>

      {/* 5. LOCACIÓN Y UBICACIÓN */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h4 className="text-3xl text-amber-200 mb-6 font-light italic">Recepción</h4>
          <p className="text-xl mb-2 text-stone-200">Salón de Eventos "El Castillo"</p>
          <p className="text-stone-400 mb-10 text-sm md:text-base">Blvd. Faja de Oro #1234, Salamanca, Gto.</p>
          
          <MapButton 
            location="https://goo.gl/maps/..." 
            label="Abrir en Google Maps" 
            className="bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold uppercase tracking-widest text-sm py-4 px-8"
          />
        </div>
      </section>

      {/* 6. DRESS CODE & REGALOS (Grid 2 columnas en PC) */}
      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Dress Code Card */}
        <div className="border border-amber-200/20 p-10 rounded-3xl text-center bg-[#0d0d11]">
          <h3 className="text-xl text-amber-400 mb-4 uppercase tracking-[0.3em] font-sans">Dress Code</h3>
          <p className="text-2xl text-stone-200 font-light mb-4 italic">Formal / Etiqueta</p>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mb-4"></div>
          <p className="text-stone-400 text-sm">Se reserva el uso del color <span className="text-red-400 font-bold">Rojo</span> o <span className="text-stone-200 font-bold">Blanco</span> exclusivo para la Quinceañera.</p>
        </div>

        {/* Lluvia de Sobres Card */}
        <div className="border border-amber-200/20 p-10 rounded-3xl text-center bg-[#0d0d11]">
          <h3 className="text-xl text-amber-400 mb-4 uppercase tracking-[0.3em] font-sans">Mesa de Regalos</h3>
          <p className="text-xl text-stone-200 font-light mb-4 italic">Lluvia de Sobres</p>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto mb-4"></div>
          <p className="text-stone-400 text-sm mb-4">El mejor regalo es tu presencia, pero si deseas tener un detalle conmigo, contaremos con un buzón en la recepción.</p>
          {/* Icono de sobre sencillo con caracteres */}
          <p className="text-3xl text-amber-500/50">✉</p>
        </div>

      </section>

      {/* CONFIRMACIÓN FLOTANTE */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="52464" eventName="XV de Diana" />
      </div>

    </div>
  );
};

export default XVLayout;