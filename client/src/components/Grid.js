import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid, majorGrid } from "../data/grid";
import ProgressBar from "./ProgressBar";
import TurnHexes from "./TurnHexes";
import { pathsContain } from "../utils";
import { updateTurn } from "../actions/gameActions";

const Grid = ({ turn, game, users }) => {
  const [hexagons, setHexagons] = useState(
    game.isMinor ? minorGrid : majorGrid
  );
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState(turn ? turn.paths : []);
  const [hexStart, setHexStart] = useState(null);
  const [dealLeft, setDealLeft] = useState([...game.deal]);
  const [moveMade, setMoveMade] = useState(false);

  const dispatch = useDispatch();

  const onClick = (e, source, hex) => {
    console.log(e.target);
    console.log(source);
    console.log(hex);
    const landscapeIndex = dealLeft.indexOf(hex.landscape);
    const anyIndex = dealLeft.indexOf("any");

    // Don't allow to make more than one move except if it is bonus move
    if (!moveMade || (turn && turn.bonusMoves.length)) {
      if (
        // Hex clicked is not in the deal
        (anyIndex === -1 && landscapeIndex === -1) ||
        // The same hex clicked
        (pathStart && HexUtils.equals(source.state.hex, pathStart)) ||
        // Hex clicked is not a neighbour
        (pathStart && HexUtils.distance(source.state.hex, pathStart)) >= 2
      ) {
        setDealLeft([...game.deal]);
        setPathStart(null);
        setHexStart(null);

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
        setPathStart(source.state.hex);
        setHexStart(hex);

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
        const newPath = { start: pathStart, end: source.state.hex };
        if (!pathsContain(newPath, paths)) {
          setPaths([...paths, newPath]);
        }

        const hexPath = [hexStart, hex];
        dispatch(
          updateTurn(hexPath, turn, game, users.groupUsers[0].groupId, [
            ...paths,
            newPath,
          ])
        );

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
      }
    }
  };

  useEffect(() => {
    if (turn && turn.bonusMoves.length && game && game.deal.length) {
      // console.log("bonus move");
      setMoveMade(false);
      setDealLeft([...game.deal]);
    }
  }, [turn, game]);

  return (
    <div className="island">
      {/* <h2 className="text-center mb-2">
        {game.isMinor ? "Малый остров" : "Большой остров"}
      </h2> */}
      <TurnHexes deal={game.deal} isBonusMove={game.isBonusMove} />
      <div className="gridContainer">
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
