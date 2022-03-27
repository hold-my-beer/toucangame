import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid, majorGrid } from "../data/grid";
import GridNotification from "./GridNotification";
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

  const dispatch = useDispatch();

  const onClick = (e, source, hex) => {
    // console.log(game.deal);
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
          // console.log(game);
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

  useEffect(() => {
    if (turn && turn.isBonusMove && game && game.deal.length) {
      setMoveMade(false);
      setDealLeft([...game.deal]);
    }
  }, [turn, game]);

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
      />
      <div className="gridContainer">
        <GridNotification
          game={game}
          turn={turn}
          userInfo={userInfo}
          moveMade={moveMade}
        />

        <HexGrid width={335} height={335} viewBox="0 0 100 100">
          <Layout
            size={game.isMinor ? { x: 5.4, y: 5.4 } : { x: 4.6, y: 4.6 }}
            flat={false}
            spacing={game.isMinor ? 1.1 : 1.1}
            origin={{ x: 52, y: 50 }}
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
              <Path key={i} start={item.start} end={item.end} />
            ))}
          </Layout>
        </HexGrid>
      </div>
      <ProgressBar />
    </div>
  );
};

export default Grid;
