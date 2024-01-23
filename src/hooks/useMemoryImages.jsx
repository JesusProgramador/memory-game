import { useEffect, useState } from "react";

const useMemoryImages = () => {
  const [images, setImages] = useState([]);
  const apiUrl =
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

  useEffect(() => {
    initializeImages();
  }, []);

  const initializeImages = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const shuffledImages = shuffleArray(data.entries).slice(0, 9);
      const duplicatedImages = [...shuffledImages, ...shuffledImages];
      const finalImages = shuffleArray(duplicatedImages).map((image) => ({
        ...image,
        matched: false,
        isFlipped: false,
        isDisabled: false,
      }));
      setImages(finalImages);
    } catch (error) {
      console.error("Error al obtener imagenes:", error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return { images, setImages, initializeImages };
};

export default useMemoryImages;
