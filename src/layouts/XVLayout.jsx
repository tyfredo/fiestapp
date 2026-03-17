import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

const XVLayout = () => {
  const fechaXV = "2026-08-15T21:00:00";

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white font-serif overflow-x-hidden">
      {/* 1. PORTADA IMPACTANTE */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070')] bg-cover bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0a0a0c]"></div>
        
        <div className="relative z-10 border-2 border-amber-200/30 p-8 md:p-16 backdrop-blur-sm">
          <h2 className="text-amber-200 text-xl tracking-[0.5em] mb-4 uppercase">Mis XV Años</h2>
          <h1 className="text-7xl md:text-9xl font-light mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-500">
            Diana
          </h1>
          <p className="text-amber-100/80 tracking-widest uppercase text-sm">Agosto 15 • 2026</p>
        </div>
      </section>

      {/* 2. CUENTA REGRESIVA ESTILO NEÓN */}
      <section className="py-20 bg-[#0a0a0c] text-center border-y border-amber-200/10">
        <h3 className="text-amber-200/60 text-lg mb-8 uppercase tracking-widest italic">La noche mágica comienza en:</h3>
        <div className="text-4xl md:text-6xl text-amber-200">
           <Countdown targetDate={fechaXV} />
        </div>
      </section>

      {/* 3. EVENTO */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl shadow-2xl">
          <h4 className="text-4xl text-amber-200 mb-6 font-light italic">Misa y Recepción</h4>
          <p className="text-xl mb-2 text-stone-300">Salón de Eventos "El Castillo"</p>
          <p className="text-stone-400 mb-10">Salamanca, Guanajuato</p>
          
          <MapButton 
            location="https://goo.gl/maps/..." 
            label="Abrir en GPS" 
            className="bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold"
          />
        </div>
      </section>

      {/* CONFIRMACIÓN */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="524641234567" eventName="XV de Diana" />
      </div>
    </div>
  );
};

export default XVLayout;