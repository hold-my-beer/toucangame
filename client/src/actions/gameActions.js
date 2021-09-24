import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
} from "../constants/gameConstants";

export const getGame = (game, userId) => (dispatch) => {
  try {
    dispatch({ type: GAME_GET_REQUEST });

    const cities = [];
    const userIndex = game.players.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      const userOffset = game.players[userIndex].offset;

      for (let i = 0; i < game.cities.length; i++) {
        const cityIndex = (i + userOffset) % game.cities.length;
        const city = game.cities[cityIndex];
        cities.push(city);
      }
    }

    const players = game.players.filter((player) => player.id !== userId);

    const updatedGame = { ...game, cities, players };

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
