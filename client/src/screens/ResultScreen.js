import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ResultScreen = ({ history }) => {
  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  useEffect(() => {
    if (
      game &&
      game.roundNumber &&
      ((game.isMinor && game.roundNumber - 1 < 2) ||
        (!game.isMinor && game.roundNumber - 1 < 3))
    ) {
      const id = setTimeout(() => {
        history.push("/minor-island");
      }, 5000);

      return () => clearTimeout(id);
    }
  }, [history, game]);

  return (
    <div className="results">
      <>
        <h1 className="large">Результаты</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message className="danger" text={error} />
        ) : (
          game &&
          game.roundNumber && (
            <>
              <p className="lead">{`${
                game.isMinor ? "Малая" : "Большая"
              } игра. Раунд ${game.roundNumber - 1}`}</p>
              <table>
                <thead>
                  <tr>
                    <th>Игрок</th>
                    <th>Артефакты</th>
                    <th>Города</th>
                    <th>Бонусы</th>
                    <th>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  {game.results.players &&
                    game.results.players.length &&
                    game.results.players.map((player) => (
                      <tr key={player.id}>
                        <td>{player.name}</td>
                        <td>{player.artefactPoints}</td>
                        <td>{player.cityPoints}</td>
                        <td>{player.bonusPoints}</td>
                        <td>{player.totalPoints}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {!game.isActive && (
                <Link to="/users" className="btn btn-primary">
                  Закончить игру
                </Link>
              )}
            </>
          )
        )}
      </>
    </div>
  );
};

export default ResultScreen;
