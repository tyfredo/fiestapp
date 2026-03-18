import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

const KidsLayout = () => {
  const fechaEvento = "2026-10-10T16:00:00";

  return (
    <div className="bg-sky-50 min-h-screen text-slate-800 font-sans overflow-x-hidden pb-12">
      
      {/* 1. PORTADA TIERNA Y PROFESIONAL */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 overflow-hidden">
        
        {/* Decoraciones de fondo (Círculos difuminados estilo premium) */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
        <div className="absolute top-32 right-10 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>

        {/* Tarjeta de Portada */}
        <div className="relative z-10 bg-white/70 p-10 md:p-16 backdrop-blur-md rounded-[3rem] shadow-xl border border-white max-w-2xl w-full">
          <p className="text-sky-600 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm">Mi Bautizo y 1er Añito</p>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-slate-800 drop-shadow-sm">
            Mateo
          </h1>
          <div className="w-24 h-1 bg-sky-300 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 tracking-widest uppercase text-sm font-bold">10 de Octubre • 2026</p>
        </div>
      </section>

      {/* 2. PADRES Y PADRINOS */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl text-sky-700 mb-12 font-black">Con la bendición de Dios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-lg border-2 border-sky-100 hover:shadow-xl transition-shadow">
            <p className="uppercase tracking-widest text-sky-400 text-xs font-black mb-4">Mis Padres</p>
            <p className="text-xl text-slate-700 font-bold">Carlos Ramírez</p>
            <p className="text-xl text-slate-700 font-bold">Ana Valeria Ruiz</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-lg border-2 border-pink-100 hover:shadow-xl transition-shadow">
            <p className="uppercase tracking-widest text-pink-400 text-xs font-black mb-4">Mis Padrinos</p>
            <p className="text-xl text-slate-700 font-bold">Fernando López</p>
            <p className="text-xl text-slate-700 font-bold">Sofía Méndez</p>
          </div>
        </div>
      </section>

      {/* 3. CUENTA REGRESIVA DIVERTIDA */}
      <section className="py-16 bg-white text-center shadow-inner border-y border-slate-100">
        <h3 className="text-sky-400 text-sm mb-6 uppercase tracking-[0.3em] font-black">¡Falta muy poco para jugar!</h3>
        <div className="text-4xl md:text-6xl text-slate-800 font-black drop-shadow-md">
           <Countdown targetDate={fechaEvento} />
        </div>
      </section>

      {/* 4. ITINERARIO (PROGRAMA DEL DÍA) */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl text-sky-700 mb-16 font-black text-center">El Plan del Día</h3>
        
        <div className="relative border-l-4 border-sky-200 ml-6 md:ml-auto md:mr-auto md:max-w-md space-y-12">
          
          {/* Actividad 1 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-sky-400 rounded-full border-4 border-white shadow-md"></div>
            <p className="text-sky-500 font-black tracking-widest text-sm mb-1">16:00 HRS</p>
            <h4 className="text-2xl text-slate-800 mb-2 font-bold">Ceremonia</h4>
            <p className="text-slate-500 text-sm">Parroquia de la Sagrada Familia.<br/>Favor de llegar 15 mins antes.</p>
          </div>

          {/* Actividad 2 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-md"></div>
            <p className="text-pink-500 font-black tracking-widest text-sm mb-1">17:30 HRS</p>
            <h4 className="text-2xl text-slate-800 mb-2 font-bold">Recepción y Comida</h4>
            <p className="text-slate-500 text-sm">Salón de Fiestas "Travesuras".<br/>¡A recargar energías!</p>
          </div>

          {/* Actividad 3 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-md"></div>
            <p className="text-yellow-500 font-black tracking-widest text-sm mb-1">19:00 HRS</p>
            <h4 className="text-2xl text-slate-800 mb-2 font-bold">Show y Piñata</h4>
            <p className="text-slate-500 text-sm">Habrá sorpresas, dulces, pastel y mucha diversión.</p>
          </div>

        </div>
      </section>

      {/* 5. LOCACIONES (Iglesia y Salón en 2 columnas) */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta Iglesia */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center border-t-[10px] border-sky-300">
          <h4 className="text-2xl text-slate-800 mb-4 font-black">La Iglesia</h4>
          <p className="text-lg mb-2 text-slate-600 font-bold">Parroquia Sagrada Familia</p>
          <p className="text-slate-500 mb-8 text-sm">Av. Universidad #456, Salamanca, Gto.</p>
          <MapButton 
            location="https://goo.gl/maps/..." 
            label="Ver Mapa" 
            className="bg-sky-100 text-sky-700 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full hover:bg-sky-200 transition-colors w-full md:w-auto inline-block"
          />
        </div>

        {/* Tarjeta Salón */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center border-t-[10px] border-pink-300">
          <h4 className="text-2xl text-slate-800 mb-4 font-black">La Fiesta</h4>
          <p className="text-lg mb-2 text-slate-600 font-bold">Salón "Travesuras"</p>
          <p className="text-slate-500 mb-8 text-sm">Blvd. Faja de Oro #789, Salamanca, Gto.</p>
          <MapButton 
            location="https://goo.gl/maps/..." 
            label="Ver Mapa" 
            className="bg-pink-100 text-pink-700 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full hover:bg-pink-200 transition-colors w-full md:w-auto inline-block"
          />
        </div>
      </section>

      {/* 6. DRESS CODE & REGALOS */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white/60 backdrop-blur-md border border-white p-10 rounded-[3rem] shadow-xl">
          <h3 className="text-xl text-slate-800 mb-8 font-black uppercase tracking-[0.2em]">Detalles Importantes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-300/50">
            {/* Vestimenta */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center justify-center">
              <p className="text-sky-500 font-black mb-3 uppercase tracking-wider text-sm">Código de Vestimenta</p>
              <p className="text-slate-600 text-sm leading-relaxed">Ropa cómoda y fresca. Colores pastel o claros. ¡Lo importante es que los niños vengan listos para jugar!</p>
            </div>
            
            {/* Regalos */}
            <div className="pt-8 md:pt-0 md:px-6 flex flex-col items-center justify-center">
              <p className="text-pink-500 font-black mb-3 uppercase tracking-wider text-sm">Mesa de Regalos</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Tu presencia es mi mejor regalo, pero si deseas darme un obsequio, soy talla <span className="font-bold text-slate-800">18-24 meses</span> y calzo del <span className="font-bold text-slate-800">13</span>. También habrá buzón para sobres.</p>
              <span className="text-3xl drop-shadow-md">🎁</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRMACIÓN FLOTANTE (Color ajustado al tema) */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Si tu RSVPButton recibe clases, aquí quedaría perfecto un botón azul o rosa */}
        <RSVPButton phone="524641234567" eventName="Bautizo de Mateo" />
      </div>

    </div>
  );
};

export default KidsLayout;