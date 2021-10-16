import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
  GAME_GET_RESET,
  // GAME_GET_TURN_REQUEST,
  // GAME_GET_TURN_SUCCESS,
  // GAME_GET_TURN_FAIL,
  GAME_UPDATE_TURN_REQUEST,
  GAME_UPDATE_TURN_SUCCESS,
  GAME_UPDATE_TURN_FAIL,
  GAME_UPDATE_TURN_RESET,
} from "../constants/gameConstants";

export const gameGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_GET_REQUEST:
      return { loading: true };
    case GAME_GET_SUCCESS:
      return { loading: false, game: action.payload };
    case GAME_GET_FAIL:
      return { loading: false, error: action.payload };
    case GAME_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const gameUpdateTurnReducer = (
  state = { turn: { number: 0, roads: [], roundPoints: [], paths: [] } },
  action
) => {
  switch (action.type) {
    case GAME_UPDATE_TURN_REQUEST:
      return { loading: true };
    case GAME_UPDATE_TURN_SUCCESS:
      return { loading: false, turn: action.payload };
    case GAME_UPDATE_TURN_FAIL:
      return { loading: false, error: action.payload };
    case GAME_UPDATE_TURN_RESET:
      return { turn: { number: 0, roads: [], roundPoints: [], paths: [] } };
    default:
      return state;
  }
};
