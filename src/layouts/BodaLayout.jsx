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
    <div className="bg-stone-50 min-h-screen text-stone-800 font-serif" data-aos="fade-up">
      {/* 1. HERO / PORTADA */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay para que se lea el texto */}
        <div className="relative z-10 text-white">
          <h2 className="text-xl uppercase tracking-[0.3em] mb-4">Nuestra Boda</h2>
          <h1 className="text-5xl md:text-8xl font-cursive text-stone-800 my-4">Elisa & Marcos</h1>
          <p className="text-lg italic text-stone-200">"El amor no tiene cura, pero es la única cura para todos los males."</p>
        </div>
      </section>

      {/* 2. CUENTA REGRESIVA */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-2xl mb-8 uppercase tracking-widest text-stone-500">Solo faltan:</h3>
        <Countdown targetDate={fechaBoda} />
      </section>

      <section className="py-20 px-6 bg-white" data-aos="fade-up">
        <h2 className="text-center font-serif text-3xl mb-10 text-stone-800 uppercase tracking-widest">Nuestra Historia</h2>
        <Carousel images={fotosBoda} />
      </section>


      {/* 3. DETALLES DEL EVENTO */}
      <section className="py-20 px-6 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="border border-stone-200 p-10 text-center rounded-sm shadow-sm bg-white" data-aos="fade-right">
          <h4 className="text-3xl mb-4">Ceremonia</h4>
          <p className="mb-2 italic">18:00 hrs</p>
          <p className="mb-6">Parroquia del Señor del Hospital, Irapuato, Gto.</p>
          <MapButton location="https://maps.app.goo.gl/..." label="Ver Ubicación" />
        </div>

        <div className="border border-stone-200 p-10 text-center rounded-sm shadow-sm bg-white" data-aos="fade-right">
          <h4 className="text-3xl mb-4">Recepción</h4>
          <p className="mb-2 italic">20:30 hrs</p>
          <p className="mb-6">Salón Villa Gardenia, Irapuato, Gto.</p>
          <MapButton location="https://maps.app.goo.gl/..." label="Ver Ubicación" />
        </div>
      </section>

      {/* 4. BOTÓN FLOTANTE RSVP (CONFIRMACIÓN) */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="52464" eventName="Boda de Elisa y Marcos" />
      </div>
    </div>
  );
};

export default BodaLayout;