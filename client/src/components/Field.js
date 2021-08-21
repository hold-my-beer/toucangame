import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Path, Text, Hexagon, HexUtils } from "react-hexgrid";
import { minorGrid } from "../data/minorGrid";
import { v4 as uuidv4 } from "uuid";

const Field = () => {
  const [hexagons, setHexagons] = useState([]);
  const [path, setPath] = useState({ start: null, end: null });
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
    if (!path.start) {
      setPath({ ...path, start: source.state.hex });

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
    else if (HexUtils.equals(source.state.hex, path.start)) {
      setPath({ ...path, start: null });

      setHexagons([
        ...hexagons.map((item) => {
          item.className = "";

          return item;
        }),
      ]);
    }
    // Hex clicked is a neighbour
    else if (HexUtils.distance(source.state.hex, path.start) < 2) {
      setPath({ ...path, end: source.state.hex });

      setHexagons([
        ...hexagons.map((item) => {
          if (
            HexUtils.equals(item, hex) ||
            (path.start && HexUtils.equals(item, path.start))
          ) {
            item.className = "active";
          } else {
            item.className = "";
          }

          return item;
        }),
      ]);
    }
    // Hex clicked is not a neighbour
    else {
      setPath({ ...path, start: null });

      setHexagons([
        ...hexagons.map((item) => {
          item.className = "";

          return item;
        }),
      ]);
    }
  };

  useEffect(() => {
    setHexagons(minorGrid);
  }, [minorGrid]);

  useEffect(() => {
    // If path.end is not null && no such path already created
    if (path.end && !pathsContain(path)) {
      setPaths([...paths, path]);
    }
    setPath({ start: null, end: null });
  }, [path.end]);

  return (
    <div className="field">
      <HexGrid width={600} height={800} viewBox="0 0 100 100">
        <Layout
          size={{ x: 5, y: 5 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 50, y: 30 }}
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

export default Field;
