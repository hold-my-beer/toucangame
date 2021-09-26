import { HexUtils } from "react-hexgrid";
import {
  GAME_GET_REQUEST,
  GAME_GET_SUCCESS,
  GAME_GET_FAIL,
  GAME_UPDATE_TURN_REQUEST,
  GAME_UPDATE_TURN_SUCCESS,
  GAME_UPDATE_TURN_FAIL,
} from "../constants/gameConstants";

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

export const updateTurn = (path, turn) => (dispatch) => {
  try {
    dispatch({ type: GAME_UPDATE_TURN_REQUEST });

    const updatedTurn = { ...turn };
    const firstHexRoadIndex = -1;
    const secondHexRoadIndex = -1;

    // Find indecies of path hexes in the roads array if there are ones
    const roads = updatedTurn.roads || [];
    for (let i = 0; i < roads.length; i++) {
      for (let j = 0; j < roads[i].length; j++) {
        if (HexUtils.equals(roads[i][j], path[0])) {
          firstHexRoadIndex = i;
          break;
        } else if (HexUtils.equals(roads[i][j], path[1])) {
          secondHexRoadIndex = i;
          break;
        }
      }

      if (firstHexRoadIndex !== -1 && secondHexRoadIndex !== -1) {
        break;
      }
    }

    // Update roads array
    let updatedRoads = [];

    if (firstHexRoadIndex !== -1 && secondHexRoadIndex !== -1) {
      updatedRoads = roads.filter(
        (road, index) =>
          index !== firstHexRoadIndex && index !== secondHexRoadIndex
      );
      updatedRoads.push([
        ...roads[firstHexRoadIndex],
        roads[secondHexRoadIndex],
      ]);
    } else if (firstHexRoadIndex !== -1) {
      updatedRoads = roads;
      updatedRoads[firstHexRoadIndex].push(path[1]);
    } else if (secondHexRoadIndex !== -1) {
      updatedRoads = roads;
      updatedRoads[secondHexRoadIndex].push(path[0]);
    } else {
      updatedRoads = roads;
      updatedRoads.push(path);
    }

    updatedTurn.roads = updatedRoads;
  } catch (error) {
    dispatch({
      type: GAME_UPDATE_TURN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
