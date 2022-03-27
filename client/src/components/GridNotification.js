import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GAME_TURN_NEW_POINTS_RESET } from "../constants/gameConstants";
import { getArtefactConstant } from "../utils";

const GridNotification = ({ game, turn, userInfo, moveMade }) => {
  const dispatch = useDispatch();

  const [newPoints, setNewPoints] = useState(false);
  const [bonusMove, setBonusMove] = useState(false);
  const [endRound, setEndRound] = useState(false);

  useEffect(() => {
    if (
      turn &&
      turn.newPoints.length
      // &&
      // game &&
      // turn.roundPoints.length === game.roundNumber
    ) {
      setNewPoints(true);
    }
  }, [
    turn,
    // , game
  ]);

  useEffect(() => {
    let id;

    if (newPoints) {
      id = setTimeout(() => {
        setNewPoints(false);
        dispatch({ type: GAME_TURN_NEW_POINTS_RESET });
      }, 1500);
    }

    return () => clearTimeout(id);
  }, [newPoints]);

  useEffect(() => {
    if (newPoints) {
      const newPointsNotification = document.getElementById(
        "newPointsNotification"
      );
      newPointsNotification.volume =
        parseInt(userInfo.settings.effectsVolume) / 100;
      newPointsNotification.play();

      // setVisible(true);
    }
  }, [newPoints, userInfo]);

  useEffect(() => {
    if (turn.isBonusMove && !turn.newPoints.length) {
      setBonusMove(true);
    }
  }, [turn]);

  useEffect(() => {
    let id;

    if (bonusMove) {
      id = setTimeout(() => {
        setBonusMove(false);
      }, 1500);
    }

    return () => clearTimeout(id);
  }, [bonusMove]);

  useEffect(() => {
    if (bonusMove) {
      const bonusMoveNotification = document.getElementById(
        "bonusMoveNotification"
      );
      bonusMoveNotification.volume =
        parseInt(userInfo.settings.effectsVolume) / 100;
      bonusMoveNotification.play();

      // setVisible(true);
    }
  }, [bonusMove, userInfo]);

  useEffect(() => {
    if (game.turnNumber === 13 && !turn.isBonusMove && moveMade) {
      setEndRound(true);
    }
  }, [game, turn, moveMade]);

  useEffect(() => {
    let id;

    if (endRound && !bonusMove) {
      id = setTimeout(() => {
        setEndRound(false);
      }, 1500);
    }

    return () => clearTimeout(id);
  }, [endRound, bonusMove]);

  useEffect(() => {
    let id;

    if (endRound && !bonusMove && !newPoints) {
      const roundEndNotification = document.getElementById(
        "roundEndNotification"
      );
      roundEndNotification.volume =
        parseInt(userInfo.settings.effectsVolume) / 100;
      roundEndNotification.play();
    }

    return () => clearTimeout(id);
  }, [endRound, bonusMove, newPoints, userInfo]);

  return (
    <>
      <audio
        id="bonusMoveNotification"
        src="audio/mixkit-winning-notification-2018.wav"
      ></audio>
      <audio
        id="roundEndNotification"
        src="audio/mixkit-arcade-score-interface-217.wav"
      ></audio>
      <audio
        id="newPointsNotification"
        src="audio/mixkit-unlock-game-notification-253.wav"
      ></audio>
      <div
        className={`gridNotification ${
          newPoints || bonusMove || endRound ? "visible" : ""
        }`}
      >
        {/* <div className="gridNotificationData"> */}
        <div className="newPoints">
          {turn.newPoints.map((item, index) => (
            <div
              className="newPoint"
              key={index}
              style={{
                animationDelay: `${index * 0.1}s`,
                background: `${
                  (item.type === "bonusArtefactPoints" ||
                    item.type === "bonusCityPoints") &&
                  'var(--success-color) url("img/icons-g033dcdf45_640.png") center/contain no-repeat'
                }`,
                backgroundImage: `${
                  (item.type === "artefactPoints" ||
                    item.type === "cityPoints") &&
                  "linear-gradient(to bottom right, var(--sand-color), var(--success-color))"
                }`,
              }}
            >
              {item.type === "artefactPoints" ||
              item.type === "bonusArtefactPoints" ? (
                <div className="newPointImage">
                  <img
                    src={getArtefactConstant(item.data.name)}
                    alt={item.data.name}
                  />
                </div>
              ) : (
                <span>{item.data.name}</span>
              )}

              {/* <div className="newPointData">
              <span>{item.data.name}</span>
            </div> */}
            </div>
          ))}
        </div>
        {!newPoints && (bonusMove || endRound) && (
          <div className="gridMessage">
            {bonusMove && <span>Бонусный ход</span>}
            {endRound && !bonusMove && (
              <span>
                {`Конец ${
                  (game.isMinor && game.roundNumber === 2) ||
                  (!game.isMinor && game.roundNumber === 3)
                    ? "игры"
                    : "раунда"
                }`}
              </span>
            )}
          </div>
        )}

        {/* </div> */}
      </div>
    </>
  );
};

export default GridNotification;
