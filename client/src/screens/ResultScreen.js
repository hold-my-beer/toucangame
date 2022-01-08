import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  GAME_GET_RESET,
  GAME_UPDATE_TURN_RESET,
} from "../constants/gameConstants";

const ResultScreen = ({ history }) => {
  const dispatch = useDispatch();

  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin;

  useEffect(() => {
    if (
      game &&
      game.roundNumber &&
      ((game.isMinor && game.roundNumber - 1 < 2) ||
        (!game.isMinor && game.roundNumber - 1 < 3))
    ) {
      const id = setTimeout(() => {
        history.push("/island");
      }, 5000);

      return () => clearTimeout(id);
    }
  }, [history, game]);

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

  const quitGameHandler = () => {
    dispatch({ type: GAME_GET_RESET });

    dispatch({ type: GAME_UPDATE_TURN_RESET });

    history.push("/users");
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
      {loading || loadingUser ? (
        <Loader />
      ) : error || errorUser ? (
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
              <button
                type="button"
                className="btn btn-primary mt-1"
                onClick={quitGameHandler}
              >
                Закончить игру
              </button>
            )}
          </>
        )
      )}
      {/* </> */}
    </div>
  );
};

export default ResultScreen;
