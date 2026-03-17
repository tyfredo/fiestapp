const KidsLayout = () => {
  return (
    <div className="bg-[#FFF9F2] min-h-screen text-[#5D4037] font-sans overflow-x-hidden">
      {/* HEADER DIVERTIDO */}
      <section className="relative py-20 px-6 text-center bg-[#E0F7FA] rounded-b-[100px] shadow-lg">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl">🎈</span>
          <h2 className="text-blue-400 uppercase tracking-widest font-bold mt-4">¡Mi Bautizo!</h2>
          <h1 className="text-6xl md:text-7xl font-bold text-[#FF8A80] my-4" style={{ fontFamily: 'cursive' }}>
            Thiago Román
          </h1>
          <p className="text-lg text-blue-300 font-medium tracking-widest uppercase">¡Acompáñame a celebrar!</p>
        </div>
      </section>

      {/* CONTENIDO TIPO TARJETA */}
      <section className="py-16 px-6 grid gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-10 rounded-[40px] shadow-xl border-4 border-dashed border-blue-100 text-center">
          <h3 className="text-3xl text-blue-400 mb-4">¿Cuándo y Dónde?</h3>
          <p className="text-2xl font-bold mb-2">24 de Mayo • 14:00 hrs</p>
          <p className="mb-8 italic">Jardín de Eventos "Los Globos", Irapuato, Gto.</p>
          <button className="bg-[#FF8A80] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#ff7061] transition">
            VER MAPA 📍
          </button>
        </div>
      </section>
    </div>
  );
};

export default KidsLayout;