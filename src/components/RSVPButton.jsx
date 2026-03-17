const RSVPButton = ({ phone, eventName }) => {
  const message = encodeURIComponent(`¡Hola! Confirmo mi asistencia al evento: ${eventName}`);
  
  return (
    <a 
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl text-lg font-bold"
      title="Confirmar por WhatsApp"
    >
      <span className="font-bold">Confirmar Asistencia</span>
    </a>
  );
};

export default RSVPButton;