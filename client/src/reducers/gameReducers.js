import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
} from "../constants/gameConstants";

export const gameGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_GET_REQUEST:
      return { loading: true };
    case GAME_GET_SUCCESS:
      return { loading: false, game: action.payload };
    case GAME_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
