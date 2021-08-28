import React, { useState } from "react";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid } from "../data/minorGrid";

const Grid = () => {
  const [hexagons, setHexagons] = useState(minorGrid);
  // const [path, setPath] = useState({ start: null, end: null });
  const [pathStart, setPathStart] = useState(null);
  const [paths, setPaths] = useState([]);

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
    // No path initiated

    // if (!path.start) {
    //   setPath({ ...path, start: source.state.hex });
    if (!pathStart) {
      setPathStart(source.state.hex);

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

    // else if (HexUtils.equals(source.state.hex, path.start)) {
    //   setPath({ ...path, start: null });
    else if (HexUtils.equals(source.state.hex, pathStart)) {
      setPathStart(null);

      setHexagons([
        ...hexagons.map((item) => {
          item.className = "";

          return item;
        }),
      ]);
    }
    // Hex clicked is a neighbour

    // else if (HexUtils.distance(source.state.hex, path.start) < 2) {
    //   setPath({ ...path, end: source.state.hex });
    else if (HexUtils.distance(source.state.hex, pathStart) < 2) {
      const newPath = { start: pathStart, end: source.state.hex };
      if (!pathsContain(newPath)) {
        setPaths([...paths, newPath]);
      }

      setHexagons([
        ...hexagons.map((item) => {
          if (
            HexUtils.equals(item, hex) ||
            // (path.start && HexUtils.equals(item, path.start))
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
    else {
      // setPath({ ...path, start: null });
      setPathStart(null);

      setHexagons([
        ...hexagons.map((item) => {
          item.className = "";

          return item;
        }),
      ]);
    }
  };

  // useEffect(() => {
  //   setHexagons(minorGrid);
  // }, []);

  // useEffect(() => {
  //   // If path.end is not null && no such path already created
  //   if (path.end && !pathsContain(path)) {
  //     setPaths([...paths, path]);
  //   }
  //   setPath({ start: null, end: null });
  // }, [path.end]);

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
              {hex.artefact === "CITY" ? (
                <Text>{hex.artefact}</Text>
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
