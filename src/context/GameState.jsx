import { useReducer } from "react";
import GameContext from "./GameContext";
import GameReducer from "./GameReducer";

const GameState = ({ children }) => {
  const initialState = {
    matchedCounts: 0,
    errorsCounts: 0,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  const setMatched = (count) => {
    dispatch({
      type: "SET_MATCHED",
      payload: count,
    });
  };

  const setError = (count) => {
    dispatch({
      type: "SET_ERROR",
      payload: count,
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        setMatched,
        setError,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
