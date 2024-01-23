import { useContext, useEffect, useState } from "react";
import { FaCheck, FaUser, FaXmark } from "react-icons/fa6";
import useMemoryImages from "../hooks/useMemoryImages";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import GameContext from "../context/GameContext";

const CardBoard = ({ userName }) => {
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [isFinishedGame, setIsFinishedGame] = useState(false);

  const { images, setImages, initializeImages } = useMemoryImages();
  const { matchedCounts, errorsCounts, setMatched, setError } =
    useContext(GameContext);

  const handleChoice = (selectedCard) => {
    if (!cardOne || (cardOne && !cardTwo && cardOne !== selectedCard)) {
      if (selectedCard === cardOne) {
        return;
      }

      setImages((prev) =>
        prev.map((card) =>
          card === selectedCard
            ? {
                ...card,
                isFlipped: !card.isFlipped,
                isDisabled: !card.isDisabled,
              }
            : card
        )
      );

      if (!cardOne) {
        setCardOne(selectedCard);
      } else {
        setCardTwo(selectedCard);
      }
    }
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.fields.image.url === cardTwo.fields.image.url) {
        setMatched(matchedCounts + 1);
        setImages((prev) => {
          return prev.map((card) => {
            if (card.fields.image.url === cardOne.fields.image.url) {
              return {
                ...card,
                matched: true,
                isFlipped: true,
                isDisabled: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        const delay = setTimeout(() => {
          setError(errorsCounts + 1);
          setImages((prev) =>
            prev.map((card) =>
              card.isFlipped && !card.matched
                ? {
                    ...card,
                    matched: false,
                    isFlipped: false,
                    isDisabled: false,
                  }
                : card
            )
          );
          resetTurn();
        }, 500);
        return () => clearTimeout(delay);
      }
    }

    const allMatched = images?.every((image) => image.matched === true);
    if (allMatched && images.length > 0) {
      const delay = setTimeout(() => {
        setIsFinishedGame(true);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [cardOne, cardTwo]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
  };

  const handleNewGame = () => {
    initializeImages();
    setIsFinishedGame(false);
    setCardOne(null);
    setCardTwo(null);
    setMatched(0);
    setError(0);
    setTurns(0);
  };

  return (
    <>
      {userName && (
        <div className="max-w-100 px-4 py-10 sm:px-6 lg:px-4 lg:py-10 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <Card
              name={userName}
              textHelper={"Sesión como invitado"}
              icon={<FaUser />}
            />

            <Card
              name={"aciertos"}
              textHelper={"Aciertos"}
              count={matchedCounts}
              icon={<FaCheck />}
            />

            <Card
              name={"errores"}
              textHelper={"Errores"}
              count={errorsCounts}
              icon={<FaXmark />}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6 mt-6 p-0 ">
            {images.map((image, index) => {
              return (
                <CardImage
                  key={index}
                  card={image}
                  handleChoice={handleChoice}
                  flipped={
                    image.fields.image.url === cardOne?.fields.image.url ||
                    image.fields.image.url === cardTwo?.fields.image.url ||
                    image.matched
                  }
                />
              );
            })}
          </div>
        </div>
      )}

      {isFinishedGame && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl text-gray-700 font-bold mb-4">
              JUEGO FINALIZADO
            </h2>

            <p className="text-gray-700 mb-4">
              Acertaste {matchedCounts} veces y cometiste {errorsCounts} errores
              en {turns} turnos.
            </p>
            <p className="text-gray-700 mb-4">Que deseas hacer?</p>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                onClick={handleNewGame}
              >
                Nuevo juego
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsFinishedGame(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardBoard;
