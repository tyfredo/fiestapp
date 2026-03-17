const MapButton = ({ location, label }) => {
  return (
    <a 
      href={location} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block bg-stone-800 text-white px-8 py-3 rounded-sm hover:bg-stone-700 transition-colors uppercase tracking-widest text-sm"
    >
      {label || 'Ver Ubicación'}
    </a>
  );
};

export default MapButton;