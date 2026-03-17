const RSVPButton = ({ phone, eventName }) => {
  const message = encodeURIComponent(`¡Hola! Confirmo mi asistencia al evento: ${eventName}`);
  
  return (
    <a 
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      title="Confirmar por WhatsApp"
    >
      <span className="font-bold">Confirmar Asistencia</span>
    </a>
  );
};

export default RSVPButton;