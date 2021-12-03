import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid, majorGrid } from "../data/grid";
import ProgressBar from "./ProgressBar";
import TurnHexes from "./TurnHexes";
import { pathsContain } from "../utils";
import { updateTurn } from "../actions/gameActions";

const Grid = ({ turn, game, users, userInfo }) => {
  const [hexagons, setHexagons] = useState(
    game.isMinor ? minorGrid : majorGrid
  );
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState(turn ? turn.paths : []);
  const [dealLeft, setDealLeft] = useState([...game.deal]);
  const [moveMade, setMoveMade] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [achievments, setAchievments] = useState(null);

  const dispatch = useDispatch();

  const onClick = (e, source, hex) => {
    // if (pathStart) {
    //   const clickTwo = document.getElementById("clickTwo");
    //   clickTwo.play();
    // } else {
    //   const clickOne = document.getElementById("clickOne");
    //   clickOne.play();
    // }

    // console.log(click);
    // console.log(e.target);
    // console.log(source);
    // console.log(hex);
    const landscapeIndex = dealLeft.indexOf(hex.landscape);
    const anyIndex = dealLeft.indexOf("any");

    // Don't allow to make more than one move except if it is bonus move
    if (
      !moveMade ||
      (turn &&
        turn.bonusMoves.filter((item) => item.moveIsMade === false).length)
    ) {
      const click = document.getElementById("click");
      click.volume = parseInt(userInfo.settings.effectsVolume) / 100;
      click.play();

      if (
        // Hex clicked is not in the deal
        (anyIndex === -1 && landscapeIndex === -1) ||
        // The same hex clicked
        (pathStart && HexUtils.equals(hex, pathStart)) ||
        // Hex clicked is not a neighbour
        (pathStart && HexUtils.distance(hex, pathStart)) >= 2
      ) {
        setDealLeft([...game.deal]);
        setPathStart(null);

        setHexagons([
          ...hexagons.map((item) => {
            item.className = "";

            return item;
          }),
        ]);
      }
      // No path initiated yet
      else if (!pathStart) {
        landscapeIndex !== -1
          ? setDealLeft([
              ...dealLeft.filter((item, index) => index !== landscapeIndex),
            ])
          : setDealLeft([
              ...dealLeft.filter((item, index) => index !== anyIndex),
            ]);
        setPathStart(hex);

        setHexagons([
          ...hexagons.map((item) => {
            if (HexUtils.equals(item, hex)) {
              item.className = "active";
            } else {
              item.className = "";
            }

            return item;
          }),
        ]);
      }
      // Hex clicked is a neighbour
      else {
        landscapeIndex !== -1
          ? setDealLeft([
              ...dealLeft.filter((item, index) => index !== landscapeIndex),
            ])
          : setDealLeft([
              ...dealLeft.filter((item, index) => index !== anyIndex),
            ]);

        const newPath = { start: pathStart, end: hex };

        // No such path exists
        if (!pathsContain(newPath, paths)) {
          setPaths([...paths, newPath]);

          const hexPath = [pathStart, hex];
          dispatch(
            updateTurn(hexPath, turn, game, users.groupUsers[0].groupId, [
              ...paths,
              newPath,
            ])
          );

          if (game.turnNumber === 13) {
            setVisible(true);
          }

          setMoveMade(true);

          setHexagons([
            ...hexagons.map((item) => {
              if (
                HexUtils.equals(item, hex) ||
                (pathStart && HexUtils.equals(item, pathStart))
              ) {
                item.className = "active";
              } else {
                item.className = "";
              }

              return item;
            }),
          ]);

          setPathStart(null);
        } else {
          setDealLeft([...game.deal]);
          setPathStart(null);

          setHexagons([
            ...hexagons.map((item) => {
              item.className = "";

              return item;
            }),
          ]);
        }
      }
    }
  };

  useEffect(() => {
    if (
      turn &&
      turn.bonusMoves.filter((item) => item.moveIsMade === false).length &&
      game &&
      game.deal.length
    ) {
      setMoveMade(false);
      setDealLeft([...game.deal]);
    }
  }, [turn, game]);

  useEffect(() => {
    if (game && game.isBonusMove) {
      const bonusMoveNotification = document.getElementById(
        "bonusMoveNotification"
      );
      bonusMoveNotification.volume =
        parseInt(userInfo.settings.effectsVolume) / 100;
      bonusMoveNotification.play();

      setVisible(true);
    }
  }, [game, userInfo]);

  // useEffect(() => {
  //   if (turn && turn.roundPoints.length) {
  //     const latestAchievments = {};

  //     latestAchievments.cityPoints = turn.roundPoints[
  //       turn.roundPoints.length - 1
  //     ].cityPoints.filter(
  //       (item) =>
  //         (parseInt(item.roundNumber) - 1) * 13 + parseInt(item.turnNumber) ===
  //         (parseInt(game.roundNumber) - 1) * 13 + parseInt(game.turnNumber) - 1
  //     );

  //     latestAchievments.artefactPoints = turn.roundPoints[
  //       turn.roundPoints.length - 1
  //     ].artefactPoints.filter(
  //       (item) =>
  //         (parseInt(item.roundNumber) - 1) * 13 + parseInt(item.turnNumber) ===
  //         (parseInt(game.roundNumber) - 1) * 13 + parseInt(game.turnNumber) - 1
  //     );

  //     latestAchievments.bonusCityPoints = turn.roundPoints[
  //       turn.roundPoints.length - 1
  //     ].bonusCityPoints.filter(
  //       (item) =>
  //         (parseInt(item.roundNumber) - 1) * 13 + parseInt(item.turnNumber) ===
  //         (parseInt(game.roundNumber) - 1) * 13 + parseInt(game.turnNumber) - 1
  //     );

  //     latestAchievments.bonusArtefactPoints = turn.roundPoints[
  //       turn.roundPoints.length - 1
  //     ].bonusArtefactPoints.filter(
  //       (item) =>
  //         (parseInt(item.roundNumber) - 1) * 13 + parseInt(item.turnNumber) ===
  //         (parseInt(game.roundNumber) - 1) * 13 + parseInt(game.turnNumber) - 1
  //     );

  //     if (
  //       latestAchievments.cityPoints.length ||
  //       latestAchievments.artefactPoints.length ||
  //       latestAchievments.bonusCityPoints.length ||
  //       latestAchievments.bonusArtefactPoints.length
  //     ) {
  //       setAchievments(latestAchievments);
  //     }
  //   }
  // }, [turn, game.turnNumber]);

  // useEffect(() => {
  //   if (achievments) {
  //     console.log(game.turnNumber);
  //     console.log(achievments);
  //     const bonusMoveNotification = document.getElementById(
  //       "bonusMoveNotification"
  //     );
  //     bonusMoveNotification.play();

  //     setVisible(true);
  //   }
  // }, [achievments]);

  useEffect(() => {
    // if (width >= 100) return;
    let id;

    if (visible) {
      id = setTimeout(() => {
        // setAchievments(null);
        setVisible(false);
      }, 1000);
    }

    return () => clearTimeout(id);
  }, [visible]);

  return (
    <div className="island">
      <audio
        id="click"
        src="audio/mixkit-hard-typewriter-click-1119.wav"
        preload="auto"
      ></audio>
      {/* <audio
        id="clickTwo"
        src="audio/mixkit-hard-click-1118.wav"
        // preload
      ></audio> */}
      <audio
        id="bonusMoveNotification"
        src="audio/mixkit-winning-notification-2018.wav"
      ></audio>
      {/* <h2 className="text-center mb-2">
        {game.isMinor ? "Малый остров" : "Большой остров"}
      </h2> */}
      <TurnHexes
        deal={game.deal}
        turnNumber={game.turnNumber}
        // isBonusMove={game.isBonusMove}
        bonusMovesQty={
          turn.bonusMoves.filter((item) => item.moveIsMade === false).length
        }
        // turn={turn}
      />
      <div className="gridContainer">
        <div className={`gridNotification ${visible ? "visible" : ""}`}>
          <span>{game.isBonusMove ? "Бонусный ход" : ""}</span>
          <span>
            {game.turnNumber === 13
              ? `Конец ${
                  (game.isMinor && game.roundNumber === 2) ||
                  (!game.isMinor && game.roundNumber === 3)
                    ? "игры"
                    : "раунда"
                }`
              : ""}
          </span>
        </div>
        <HexGrid width={335} height={335} viewBox="0 0 100 100">
          <Layout
            size={game.isMinor ? { x: 5.4, y: 5.4 } : { x: 4.6, y: 4.6 }}
            flat={false}
            spacing={game.isMinor ? 1.1 : 1.1}
            origin={{ x: 52, y: 50 }}
            // onClick={(e) => console.log(e.target)}
          >
            {hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                className={
                  hex.className
                    ? hex.landscape + " " + hex.className
                    : hex.landscape
                }
                onClick={(e, h) => onClick(e, h, hex)}
              >
                {hex.artefact.substring(0, 4) === "CITY" ? (
                  <Text className="city">
                    {game.cityScenario[parseInt(hex.artefact.substring(4, 5))]}
                  </Text>
                ) : (
                  <image
                    href={hex.artefact}
                    height="7"
                    width="7"
                    x="-4"
                    y="-4"
                  />
                )}
              </Hexagon>
            ))}
            {turn.paths.map((item, i) => (
              <Path
                key={i}
                start={item.start}
                end={item.end}
                // onClick={(e, h) => console.log("path")}
              />
            ))}
          </Layout>
        </HexGrid>
      </div>
      <ProgressBar />
    </div>
  );
};

export default Grid;
