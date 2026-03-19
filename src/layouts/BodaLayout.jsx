import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';
import Carousel from '../components/Carousel';

const BodaLayout = () => {
  // Fecha de ejemplo para la cuenta regresiva
  const fechaBoda = "2026-12-31T18:00:00";
  const fotosBoda = [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
  ];

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-serif overflow-x-hidden">
      
      {/* 1. HERO / PORTADA */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')] bg-cover bg-center">
        {/* Overlay más oscuro para asegurar contraste sin importar la foto */}
        <div className="absolute inset-0 bg-black/40"></div> 
        
        <div className="relative z-10 text-white w-full px-4">
          <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-sans font-bold">Nuestra Boda</h2>
          
          {/* Aquí el cambio clave: text-white, font-serif y sombra pronunciada */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white my-6 drop-shadow-2xl">
            Elisa & Marcos
          </h1>
          
          <div className="w-16 h-[1px] bg-white mx-auto mb-6"></div>
          <p className="text-sm md:text-lg italic text-stone-200 font-light tracking-widest max-w-2xl mx-auto">
            "El amor no tiene cura, pero es la única cura para todos los males."
          </p>
        </div>
      </section>

      {/* 2. CUENTA REGRESIVA */}
      <section className="py-24 bg-white text-center">
        <h3 className="text-sm md:text-base mb-10 uppercase tracking-[0.3em] text-stone-500 font-sans font-bold">Solo faltan:</h3>
        <div className="text-stone-800">
          <Countdown targetDate={fechaBoda} />
        </div>
      </section>

      {/* 3. HISTORIA / CARRUSEL */}
      <section className="py-24 px-6 bg-stone-50">
        <h2 className="text-center font-serif text-3xl md:text-5xl mb-16 text-stone-800 italic">Nuestra Historia</h2>
        {/* Un marco tipo foto polaroid elegante para el carrusel */}
        <div className="max-w-4xl mx-auto border-[12px] border-white shadow-2xl">
          <Carousel images={fotosBoda} />
        </div>
      </section>

      {/* 4. DETALLES DEL EVENTO */}
      <section className="py-24 px-6 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="border border-stone-200 p-12 text-center bg-white shadow-xl">
          <h4 className="text-3xl md:text-4xl mb-6 font-serif italic text-stone-800">Ceremonia</h4>
          <p className="mb-2 font-sans tracking-widest text-stone-500 text-sm font-bold">18:00 HRS</p>
          <div className="w-8 h-[1px] bg-stone-300 mx-auto my-4"></div>
          <p className="mb-8 text-stone-600 font-sans text-sm leading-relaxed">Parroquia del Señor del Hospital<br/>Centro Histórico.</p>
          <MapButton location="https://goo.gl/maps/..." label="Ver Mapa" className="bg-stone-800 text-white px-8 py-3 text-xs tracking-widest uppercase font-sans hover:bg-stone-600 transition-colors" />
        </div>

        <div className="border border-stone-200 p-12 text-center bg-white shadow-xl">
          <h4 className="text-3xl md:text-4xl mb-6 font-serif italic text-stone-800">Recepción</h4>
          <p className="mb-2 font-sans tracking-widest text-stone-500 text-sm font-bold">20:30 HRS</p>
          <div className="w-8 h-[1px] bg-stone-300 mx-auto my-4"></div>
          <p className="mb-8 text-stone-600 font-sans text-sm leading-relaxed">Salón Villa Gardenia<br/>Zona Norte.</p>
          <MapButton location="https://goo.gl/maps/..." label="Ver Mapa" className="bg-stone-800 text-white px-8 py-3 text-xs tracking-widest uppercase font-sans hover:bg-stone-600 transition-colors" />
        </div>
      </section>

      {/* 5. BOTÓN FLOTANTE RSVP (WHATSAPP OFICIAL) */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="52462" eventName="Boda de Elisa y Marcos" />
      </div>
    </div>
  );
};

export default BodaLayout;