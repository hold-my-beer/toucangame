import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid } from "../data/minorGrid";
import { pathsContain } from "../utils";
import { updateTurn } from "../actions/gameActions";

const Grid = ({ turn, game, users }) => {
  const [hexagons, setHexagons] = useState(minorGrid);
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState(turn ? turn.paths : []);
  const [hexStart, setHexStart] = useState(null);
  const [hexUsed, setHexUsed] = useState([...game.deal]);
  const [moveMade, setMoveMade] = useState(false);

  const dispatch = useDispatch();

  const onClick = (e, source, hex) => {
    const landscapeIndex = hexUsed.indexOf(hex.landscape);
    const anyIndex = hexUsed.indexOf("any");

    // Don't allow to make more than one move
    if (!moveMade) {
      // Hex clicked is not in the deal or been used
      if (
        (anyIndex === -1 && landscapeIndex === -1) ||
        // The same hex clicked
        (pathStart && HexUtils.equals(source.state.hex, pathStart)) ||
        // Hex clicked is not a neighbour
        (pathStart && HexUtils.distance(source.state.hex, pathStart)) >= 2
      ) {
        setHexUsed([...game.deal]);
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
          ? setHexUsed([
              ...hexUsed.filter((item, index) => index !== landscapeIndex),
            ])
          : setHexUsed([
              ...hexUsed.filter((item, index) => index !== anyIndex),
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
          ? setHexUsed([
              ...hexUsed.filter((item, index) => index !== landscapeIndex),
            ])
          : setHexUsed([
              ...hexUsed.filter((item, index) => index !== anyIndex),
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

  return (
    <div className="island">
      <h2 className="text-center my-1 mb-2">
        {game.isMinor ? "Малый остров" : "Большой остров"}
      </h2>
      <div className="grid">
        <HexGrid width={600} height={500} viewBox="0 0 85 85">
          <Layout
            size={{ x: 5, y: 5 }}
            flat={false}
            spacing={1.1}
            origin={{ x: 45, y: 47 }}
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
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
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
    </div>
  );
};

export default Grid;
