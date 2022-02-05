import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid, majorGrid } from "../data/grid";
import GridNotification from "./GridNotification";
import ProgressBar from "./ProgressBar";
import TurnHexes from "./TurnHexes";
import { pathsContain } from "../utils";
import { updateTurn } from "../actions/gameActions";
// import { GAME_RESET_BONUS_MOVE } from "../constants/gameConstants";

const Grid = ({ turn, game, users, userInfo }) => {
  const [hexagons, setHexagons] = useState(
    game.isMinor ? minorGrid : majorGrid
  );
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState(turn ? turn.paths : []);
  const [dealLeft, setDealLeft] = useState([...game.deal]);
  const [moveMade, setMoveMade] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const [endRound, setEndRound] = useState(false);
  // const [newPoints, setNewPoints] = useState([]);
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
      (turn && turn.isBonusMove)
      // turn.bonusMoves.filter((item) => item.moveIsMade === false).length)
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
        // if (game && game.isBonusMove) {
        //   dispatch({ type: GAME_RESET_BONUS_MOVE });
        // }

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
        // if (game && game.isBonusMove) {
        //   dispatch({ type: GAME_RESET_BONUS_MOVE });
        // }

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

          // if (game.turnNumber === 13) {
          //   // setVisible(true);
          //   setEndRound(true);
          // }

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

  // useEffect(() => {
  //   if (turn && turn.newPoints) {
  //     for (let pointGroup in turn.newPoints) {
  //       for (let item of turn.newPoints[pointGroup]) {
  //         // if (!newPoint) {
  //         // setAchievments(null);

  //         setNewPoints([...newPoints, item]);

  //         // setVisible(true);
  //         // }
  //         // setNewPoint("");
  //       }
  //     }
  //   }
  // }, [turn, newPoints]);

  // useEffect(() => {
  //   if (newPoints.length) {
  //     setVisible(true);
  //   }
  // }, [newPoints]);

  // useEffect(() => {
  //   if (turn && turn.newPoints) {
  //     if (turn.newPoints.cityPoints) {
  //       turn.newPoints.cityPoints.forEach((item) => {
  //         setNewPoint(item.name);
  //         setVisible(true);
  //       });
  //     }
  //     if (turn.newPoints.bonusCityPoints) {
  //       turn.newPoints.bonusCityPoints.forEach((item) => {
  //         setNewPoint(item.name);
  //         setVisible(true);
  //       });
  //     }
  //     if (turn.newPoints.artefactPoints) {
  //       turn.newPoints.artefactPoints.forEach((item) => {
  //         setNewPoint(item.name);
  //         setVisible(true);
  //       });
  //     }
  //     if (turn.newPoints.bonusArtefactPoints) {
  //       turn.newPoints.bonusArtefactPoints.forEach((item) => {
  //         setNewPoint(item.name);
  //         setVisible(true);
  //       });
  //     }
  //   }
  // }, [turn]);

  // useEffect(() => {
  //   if (turn && turn.isBonusMove) {
  //     setDealLeft(["any", "any"]);
  //   }
  // }, [turn]);

  // useEffect(() => {
  //   if (turn && turn.newPoints.length) {
  //     setNewPoints([...turn.newPoints])
  //   }
  // }, [turn]);

  useEffect(() => {
    if (
      turn &&
      // turn.bonusMoves.filter((item) => item.moveIsMade === false).length &&
      turn.isBonusMove &&
      game &&
      game.deal.length
    ) {
      setMoveMade(false);
      setDealLeft([...game.deal]);
    }
  }, [turn, game]);

  // useEffect(() => {
  //   if (game && game.isBonusMove) {
  //     const bonusMoveNotification = document.getElementById(
  //       "bonusMoveNotification"
  //     );
  //     bonusMoveNotification.volume =
  //       parseInt(userInfo.settings.effectsVolume) / 100;
  //     bonusMoveNotification.play();

  //     setVisible(true);
  //   }
  // }, [game, userInfo]);

  // useEffect(() => {
  //   if (
  //     turn &&
  //     turn.isBonusMove
  //     // && !newPoints.length
  //   ) {
  //     const bonusMoveNotification = document.getElementById(
  //       "bonusMoveNotification"
  //     );
  //     bonusMoveNotification.volume =
  //       parseInt(userInfo.settings.effectsVolume) / 100;
  //     bonusMoveNotification.play();

  //     setVisible(true);
  //   }
  // }, [turn, userInfo]);

  // useEffect(() => {
  //   let id;

  //   if (endRound && turn && !turn.isBonusMove) {
  //     id = setTimeout(() => {
  //       setEndRound(false);
  //     }, 1500);
  //   }

  //   return () => clearTimeout(id);
  // }, [endRound, turn]);

  // useEffect(() => {
  //   let id;

  //   if (visible) {
  //     id = setTimeout(() => {
  //       setVisible(false);
  //     }, 1500);
  //   }

  //   return () => clearTimeout(id);
  // }, [visible]);

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
      {/* <audio
        id="bonusMoveNotification"
        src="audio/mixkit-winning-notification-2018.wav"
      ></audio> */}
      {/* <audio
        id="roundEndNotification"
        src="audio/mixkit-arcade-score-interface-217.wav"
      ></audio> */}
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
        <GridNotification
          game={game}
          turn={turn}
          userInfo={userInfo}
          moveMade={moveMade}
          // endRound={endRound}
        />
        {/* <div className={`gridNotification ${visible ? "visible" : ""}`}>
          <div className="gridNotificationData">
            {turn.newPoints.map((item, index) => (
              <span key={index}>{item.data.name}</span>
            ))}
            <span>
              {
                // !newPoints.length &&
                turn.isBonusMove ? "Бонусный ход" : ""
              }
            </span>
            <span>
              {game.turnNumber === 13 && !turn.isBonusMove
                ? // && !newPoints.length
                  `Конец ${
                    (game.isMinor && game.roundNumber === 2) ||
                    (!game.isMinor && game.roundNumber === 3)
                      ? "игры"
                      : "раунда"
                  }`
                : ""}
            </span>
          </div>
        </div> */}
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
