import socket from "../config/socket";
import {
  GAME_PLAYERS_GET_REQUEST,
  GAME_PLAYERS_GET_SUCCESS,
  GAME_PLAYERS_GET_FAIL,
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
  GAME_UPDATE_TURN_REQUEST,
  GAME_UPDATE_TURN_SUCCESS,
  GAME_UPDATE_TURN_FAIL,
  GAME_SET_BONUS_MOVE,
} from "../constants/gameConstants";
import { findCityScenario, getUpdatedTurn } from "../utils";

export const getPlayers = (game, userId) => (dispatch) => {
  try {
    dispatch({ type: GAME_PLAYERS_GET_REQUEST });

    const cityScenario = findCityScenario(game, userId);

    const players = game.players.filter((player) => player.id !== userId);

    const updatedGame = { ...game, cityScenario, players };

    dispatch({
      type: GAME_PLAYERS_GET_SUCCESS,
      // payload: {
      //   ...game,
      //   players: game.players.filter((player) => player.id !== userId),
      // },
      payload: updatedGame,
    });
  } catch (error) {
    dispatch({
      type: GAME_PLAYERS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGame = (game, userId) => (dispatch) => {
  try {
    dispatch({ type: GAME_GET_REQUEST });

    // const cityScenario = [];
    // const userIndex = game.players.findIndex((user) => user.id === userId);

    // if (userIndex !== -1) {
    //   const userOffset = game.players[userIndex].offset;

    //   for (let i = 0; i < game.cityScenario.length; i++) {
    //     const cityIndex = (i + userOffset) % game.cityScenario.length;
    //     const city = game.cityScenario[cityIndex];
    //     cityScenario.push(city);
    //   }
    // }
    const cityScenario = findCityScenario(game, userId);

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

export const updateTurn = (path, turn, game, groupId, paths) => (dispatch) => {
  try {
    dispatch({ type: GAME_UPDATE_TURN_REQUEST });

    // console.log(game);

    // const updatedTurn = getUpdatedTurn(path, turn, game, paths);
    const updatedTurn = { ...getUpdatedTurn(path, turn, game), paths };

    // console.log(game);

    // const bonusMoveIndex = updatedTurn.bonusMoves.findIndex(
    //   (item) => item.moveIsMade === false
    // );

    // If no bonus moves to be made
    // if (bonusMoveIndex === -1) {
    if (!updatedTurn.isBonusMove) {
      dispatch({
        type: GAME_UPDATE_TURN_SUCCESS,
        payload: updatedTurn,
      });

      if (game.turnNumber === 13) {
        setTimeout(() => {
          socket.emit("updateTurn", {
            gameId: game.id,
            turn: updatedTurn,
            groupId,
          });
        }, 7000);
      } else {
        socket.emit("updateTurn", {
          gameId: game.id,
          turn: updatedTurn,
          groupId,
        });
      }
      // If bonus move is to be made
    } else {
      dispatch({
        type: GAME_UPDATE_TURN_SUCCESS,
        payload: updatedTurn,
      });

      dispatch({
        type: GAME_SET_BONUS_MOVE,
        payload: game,
      });
    }
  } catch (error) {
    // console.log(error);
    dispatch({
      type: GAME_UPDATE_TURN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
