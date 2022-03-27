import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import socket from "../config/socket";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import { USER_LIST_RESET } from "../constants/userConstants";
import {
  GAME_GET_RESET,
  GAME_UPDATE_TURN_RESET,
  GAME_SET_LOADING,
} from "../constants/gameConstants";

const ResultScreen = ({ history }) => {
  const dispatch = useDispatch();

  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingList, error: errorList, users } = userList;

  useEffect(() => {
    if (game) {
      if (game.isActive) {
        const id = setTimeout(() => {
          history.push("/island");
        }, 5000);

        return () => clearTimeout(id);
      } else if (
        // userInfo &&
        users &&
        users.groupUsers &&
        users.groupUsers.length
      ) {
        const id = setTimeout(() => {
          dispatch({ type: GAME_GET_RESET });

          dispatch({ type: GAME_UPDATE_TURN_RESET });

          dispatch({ type: GAME_SET_LOADING });

          if (users.groupUsers[0].isLeader) {
            socket.emit("launchRandomUserGame", {
              users: users.groupUsers,
              isMinor: game.isMinor,
            });
          }

          history.push("/island");
        }, 10000);

        return () => clearTimeout(id);
      }
    }
  }, [history, game, userInfo, users]);

  useEffect(() => {
    const resultsBackgroundMusic = document.getElementById(
      "resultsBackgroundMusic"
    );

    if (resultsBackgroundMusic && userInfo) {
      resultsBackgroundMusic.volume =
        userInfo.settings &&
        userInfo.settings.musicVolume &&
        parseInt(userInfo.settings.musicVolume) / 100;
    }
  }, [userInfo]);

  const selectGameHandler = () => {
    dispatch({ type: GAME_GET_RESET });

    dispatch({ type: GAME_UPDATE_TURN_RESET });

    // history.push("/users");
    history.push("/select-game");
  };

  const quitGameHandler = () => {
    dispatch({ type: USER_LIST_RESET });

    dispatch({ type: GAME_GET_RESET });

    dispatch({ type: GAME_UPDATE_TURN_RESET });

    // history.push("/users");
    history.push("/profile");
  };

  return (
    <div className="results">
      <audio
        id="resultsBackgroundMusic"
        src="audio/bensound-jazzyfrenchy.mp3"
        autoPlay={true}
        loop={true}
      ></audio>
      {/* <> */}
      <h1 className="large">Результаты</h1>
      {loading || loadingUser || loadingList ? (
        <Loader />
      ) : error || errorUser || errorList ? (
        <Message className="danger" text={error} />
      ) : (
        game &&
        game.roundNumber && (
          <>
            <p className="lead">{`${
              game.isMinor ? "Малая" : "Большая"
            } игра. Раунд ${game.roundNumber - 1}`}</p>
            <table className="resultsTable">
              <thead>
                <tr>
                  <th className="playerColumn">Игрок</th>
                  <th className="artefactColumn">Артефакты</th>
                  <th className="cityColumn">Города</th>
                  <th className="bonusColumn">Бонусы</th>
                  <th className="totalColumn">Итого</th>
                </tr>
              </thead>
              <tbody>
                {game.results.players &&
                  game.results.players.length &&
                  game.results.players.map((player) => (
                    <tr key={player.id}>
                      <td className="playerColumn">{player.name}</td>
                      <td className="artefactColumn">
                        {player.artefactPoints}
                      </td>
                      <td className="cityColumn">{player.cityPoints}</td>
                      <td className="bonusColumn">{player.bonusPoints}</td>
                      <td className="totalColumn">{player.totalPoints}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {!game.isActive && (
              // <Link to="/users" className="btn btn-primary mt-1">
              //   Закончить игру
              // </Link>
              <div className="endGameOptions">
                <div className="anotherGame mt-1 mb-2">
                  <p>Запуск новой игры...</p>
                  <ProgressBar />
                </div>
                <div className="endGameButtons">
                  <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={selectGameHandler}
                  >
                    Выбрать другую игру
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-1"
                    onClick={quitGameHandler}
                  >
                    Выйти из игры
                  </button>
                </div>
              </div>
            )}
          </>
        )
      )}
      {/* </> */}
    </div>
  );
};

export default ResultScreen;
