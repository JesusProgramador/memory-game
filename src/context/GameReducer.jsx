import { SET_MATCHED, SET_ERROR } from "./actions";

const GameReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MATCHED:
      return {
        ...state,
        matchedCounts: payload,
      };

    case SET_ERROR:
      return {
        ...state,
        errorsCounts: payload,
      };

    default:
      break;
  }
};

export default GameReducer;
