import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
  GAME_GET_RESET,
  GAME_UPDATE_TURN_REQUEST,
  GAME_UPDATE_TURN_SUCCESS,
  GAME_UPDATE_TURN_FAIL,
  GAME_UPDATE_TURN_RESET,
  GAME_SET_BONUS_MOVE,
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
    case GAME_SET_BONUS_MOVE:
      return {
        loading: false,
        game: { ...action.payload, deal: ["any", "any"], isBonusMove: true },
      };
    default:
      return state;
  }
};

export const gameUpdateTurnReducer = (
  state = { turn: { roads: [], roundPoints: [], paths: [], bonusMoves: [] } },
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
      return {
        turn: { roads: [], roundPoints: [], paths: [], bonusMoves: [] },
      };
    default:
      return state;
  }
};
