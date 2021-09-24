import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid } from "../data/minorGrid";
import { updatePlayerGame } from "../actions/gameActions";

const Grid = ({ cities, deal }) => {
  const [hexagons, setHexagons] = useState(minorGrid);
  // const [path, setPath] = useState({ start: null, end: null });
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState([]);
  const [hexStart, setHexStart] = useState(null);
  const [hexUsed, setHexUsed] = useState([...deal]);

  const dispatch = useDispatch();

  const pathsContain = (newPath) => {
    return (
      paths.filter(
        (item) =>
          (HexUtils.equals(item.start, newPath.start) &&
            HexUtils.equals(item.end, newPath.end)) ||
          (HexUtils.equals(item.start, newPath.end) &&
            HexUtils.equals(item.end, newPath.start))
      ).length > 0
    );
  };

  const onClick = (e, source, hex) => {
    // // Hex clicked is not in the deal or been
    // if (deal.indexOf(hex.landscape) === -1) {
    //   setPathStart(null);
    //   setHexStart(null);

    //   setHexagons([
    //     ...hexagons.map((item) => {
    //       item.className = "";

    //       return item;
    //     }),
    //   ]);
    // }
    const landscapeIndex = hexUsed.indexOf(hex.landscape);
    console.log(landscapeIndex);

    // Hex clicked is not in the deal or been used
    if (
      landscapeIndex === -1 ||
      //Hex clicked is in the deal but this landscape has already been used

      // The same hex clicked
      (pathStart && HexUtils.equals(source.state.hex, pathStart)) ||
      // Hex clicked is not a neighbour
      (pathStart && HexUtils.distance(source.state.hex, pathStart)) >= 2
    ) {
      setHexUsed([...deal]);
      setPathStart(null);
      setHexStart(null);

      setHexagons([
        ...hexagons.map((item) => {
          item.className = "";

          return item;
        }),
      ]);
    }
    // No path initiated
    else if (!pathStart) {
      // console.log(landscapeIndex);
      // const updatedHexUsed = [];
      // hexUsed.forEach((item, index) => {
      //   if (index !== landscapeIndex) {
      //     updatedHexUsed.push(item);
      //   }
      // });
      // setHexUsed(updatedHexUsed);
      setHexUsed([
        ...hexUsed.filter((item, index) => index !== landscapeIndex),
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
    // The same hex clicked
    // else if (HexUtils.equals(source.state.hex, pathStart)) {
    //   setPathStart(null);
    //   setHexStart(null);

    //   setHexagons([
    //     ...hexagons.map((item) => {
    //       item.className = "";

    //       return item;
    //     }),
    //   ]);
    // }
    // Hex clicked is a neighbour
    // if (HexUtils.distance(source.state.hex, pathStart) < 2)
    else {
      // const updatedHexUsed = [];
      // hexUsed.forEach((item, index) => {
      //   if (index !== landscapeIndex) {
      //     updatedHexUsed.push(item);
      //   }
      // });
      // setHexUsed(updatedHexUsed);
      setHexUsed([
        ...hexUsed.filter((item, index) => index !== landscapeIndex),
      ]);
      const newPath = { start: pathStart, end: source.state.hex };
      if (!pathsContain(newPath)) {
        setPaths([...paths, newPath]);
      }

      const newHexes = { start: hexStart, end: hex };
      // dispatch(updatePlayerGame(newHexes));
      // console.log(hex);

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
    // Hex clicked is not a neighbour
    // else {
    //   setPathStart(null);
    //   setHexStart(null);

    //   setHexagons([
    //     ...hexagons.map((item) => {
    //       item.className = "";

    //       return item;
    //     }),
    //   ]);
    // }
  };

  return (
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
                  {cities[hex.artefact.substring(4, 5)]}
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
          {paths.map((item, i) => (
            <Path key={i} start={item.start} end={item.end} />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default Grid;
