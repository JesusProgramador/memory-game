const CardImage = ({ card, handleChoice }) => {
  const defaultImageUrl =
    "https://img.freepik.com/vector-gratis/vector-tipografia-estilo-basura-trazo-pincel-signo-interrogacion_53876-140880.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705968000&semt=ais";

  const handleCardClick = () => {
    handleChoice(card);
  };

  return (
    <div
      className={`bg-slate-900 w-40 h-40 rounded-md shadow-md ${
        card.matched && "grayscale"
      } ${
        !card.isDisabled
          ? "cursor-pointer hover:translate-y-2"
          : "cursor-not-allowed"
      } overflow-hidden ease-out  transition-all transform ${
        card.isFlipped ? "rotateY-180 origin-center" : ""
      }`}
      onClick={!card.isDisabled ? handleCardClick : null}
    >
      {card.isFlipped ? (
        <div className="absolute inset-0 w-full h-full flex justify-center items-center  transition-all z-10 card-back">
          <img
            src={card.fields.image.url}
            alt={card.meta.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full flex justify-center items-center  transition-all duration-200  z-20">
          <img
            src={defaultImageUrl}
            alt="Default"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default CardImage;
