import Countdown from '../components/Countdown';
import RSVPButton from '../components/RSVPButton';
import MapButton from '../components/MapButton';

// Asegúrate de que los nombres de estas imágenes coincidan con los tuyos
import floresArriba from '../assets/flor-arriba.png'; 
import floresAbajo from '../assets/flor-abajo.png';
import fondoPapel from '../assets/textura-papel.jpg'; 

const RenataXVLayout = () => {
  const fechaEvento = "2026-07-18T13:00:00"; 

  return (
    <div className="min-h-screen text-stone-800 font-serif overflow-x-hidden relative">
      
      {/* 1. PORTADA ESTILO FINE ART (9B.JPG) */}
      <section className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden">
        
        {/* CAPA 0: FONDO DE PAPEL VIEJO */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fondoPapel})`, backgroundColor: '#F9F6F0' }}
        >
          <div className="absolute inset-0 bg-botanical-parchment/60"></div>
        </div>

        {/* CAPA 1: ARTE FLORAL */}
        <img 
          src={floresArriba} 
          alt="Flores superiores" 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full max-w-2xl opacity-90 z-10 pointer-events-none" 
        />
        
        <img 
          src={floresAbajo} 
          alt="Flores inferiores" 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full max-w-2xl opacity-90 z-10 pointer-events-none" 
        />

        {/* CAPA 2: TEXTO CENTRAL (Sin recuadro, estilo papelería fina) */}
        <div className="relative z-20 w-full max-w-2xl flex flex-col items-center text-center mt-12 md:mt-0 drop-shadow-sm">
          
          <p className="text-botanical-thicket tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-4 md:mb-6">
            Mis XV Años
          </p>

          {/* Nombre principal (Estilo Caligrafía Premium) */}
          <h1 className="text-[120px] md:text-[160px] leading-none mb-8 text-botanical-berry font-script drop-shadow-sm">
            Renata
          </h1>
          
          {/* Acomodo de Fecha (Estilo 9b.jpg) */}
          <div className="flex flex-col items-center">
            
            <div className="flex items-center justify-center space-x-6 md:space-x-10 text-stone-700">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif">Sábado</p>
              
              {/* Separador Vertical */}
              <div className="h-12 w-[1px] bg-botanical-grass/60"></div>
              
              {/* Día en grande */}
              <p className="text-5xl md:text-7xl font-serif text-botanical-berry font-light">18</p>
              
              {/* Separador Vertical */}
              <div className="h-12 w-[1px] bg-botanical-grass/60"></div>
              
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif">Julio</p>
            </div>

            {/* Año */}
            <p className="text-stone-500 tracking-[0.5em] mt-8 text-sm md:text-base">
              2026
            </p>

          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE PADRES Y PADRINOS */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto relative z-10">
        <h3 className="text-3xl text-botanical-berry mb-12 italic font-light">En compañía de mis padres</h3>
        <div className="space-y-2 text-xl text-stone-700 font-serif">
          <p>Francisco Hernández</p>
          <p>Mayela Ornelas</p>
        </div>

        <div className="my-16 flex justify-center">
          <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
          <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
          <div className="w-1 h-1 bg-botanical-grass rounded-full mx-1"></div>
        </div>

        <h3 className="text-2xl text-botanical-sky mb-8 italic font-light">Y mis padrinos</h3>
        <p className="text-lg text-stone-600 font-serif">Arturo Ornelas y Susana Ornelas</p>
      </section>

      {/* 3. CUENTA REGRESIVA */}
      <section className="py-20 text-center border-y border-botanical-grass/20 bg-white/30 backdrop-blur-sm relative z-10">
        <h3 className="text-botanical-thicket text-xs mb-8 uppercase tracking-[0.4em] font-bold">Faltan:</h3>
        <div className="text-4xl md:text-5xl text-botanical-berry">
           <Countdown targetDate={fechaEvento} />
        </div>
      </section>

      {/* 4. LOCACIONES Y DETALLES */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80">
          <h4 className="text-3xl text-botanical-berry mb-6 italic">Ceremonia</h4>
          <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">13:00 HRS</p>
          <p className="text-stone-600 mb-8 text-sm leading-relaxed">
            Templo del Señor de la Misericordia<br/>
            Prolongación Guerrero #3009<br/>
            Fracc. Las Plazas
          </p>
          <MapButton 
            location="https://goo.gl/maps/tu-enlace-aqui" 
            label="Ver Ubicación" 
            className="bg-botanical-sky hover:bg-botanical-berry transition-colors duration-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold" 
          />
        </div>

        <div className="bg-white/60 p-12 rounded-sm shadow-lg text-center border border-white/80">
          <h4 className="text-3xl text-botanical-berry mb-6 italic">Recepción</h4>
          <p className="text-stone-700 mb-2 font-bold uppercase tracking-widest">14:30 HRS</p>
          <p className="text-stone-600 mb-8 text-sm leading-relaxed">
            Jardín Alvori<br/>
            [Ciudad, Estado]
          </p>
          <MapButton 
            location="#" 
            label="Próximamente" 
            className="bg-stone-300 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold cursor-not-allowed" 
          />
        </div>
      </section>

      {/* BOTÓN FLOTANTE RSVP */}
      <div className="fixed bottom-8 right-8 z-50">
        <RSVPButton phone="524622105919" eventName="XV de Renata" />
      </div>

    </div>
  );
};

export default RenataXVLayout;