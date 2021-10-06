import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
  GAME_UPDATE_TURN_REQUEST,
  GAME_UPDATE_TURN_SUCCESS,
  GAME_UPDATE_TURN_FAIL,
} from "../constants/gameConstants";
import { getUpdatedTurn } from "../utils";

export const getGame = (game, userId) => (dispatch) => {
  try {
    dispatch({ type: GAME_GET_REQUEST });

    const cityScenario = [];
    const userIndex = game.players.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      const userOffset = game.players[userIndex].offset;

      for (let i = 0; i < game.cityScenario.length; i++) {
        const cityIndex = (i + userOffset) % game.cityScenario.length;
        const city = game.cityScenario[cityIndex];
        cityScenario.push(city);
      }
    }

    const players = game.players.filter((player) => player.id !== userId);

    const updatedGame = { ...game, cityScenario, players };

    dispatch({
      type: GAME_GET_SUCCESS,
      payload: updatedGame,
    });
  } catch (error) {
    dispatch({
      type: GAME_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTurn = (path, turn, game) => (dispatch) => {
  try {
    dispatch({ type: GAME_UPDATE_TURN_REQUEST });

    dispatch({
      type: GAME_UPDATE_TURN_SUCCESS,
      payload: getUpdatedTurn(path, turn, game),
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GAME_UPDATE_TURN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
