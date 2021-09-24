import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";

const TurnHexes = ({ deal }) => {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    if (width >= 100) return;

    const id = setTimeout(() => {
      setWidth(width + 1);
    }, 300);

    return () => clearTimeout(id);
  }, [width]);

  return (
    <div className="turnHexes my-1 mb-2">
      <h4 className="text-center">Текущий ход</h4>
      <HexGrid width={250} height={80} viewBox="-2 -9 17 17">
        <Layout
          size={{ x: 7, y: 7 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {deal.map((item, index) =>
            item === "any" ? (
              <Hexagon
                key={index}
                q={index}
                r={0}
                s={0 - index}
                className="any"
                fill="MyGradient"
              >
                <defs>
                  <linearGradient id="MyGradient" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffff99" />
                    <stop offset="25%" stopColor="#ffff99" />
                    <stop offset="25%" stopColor="#66ff33" />
                    <stop offset="50%" stopColor="#66ff33" />
                    <stop offset="50%" stopColor="#777" />
                    <stop offset="75%" stopColor="#777" />
                    <stop offset="75%" stopColor="#0099ff" />
                    <stop offset="100%" stopColor="#0099ff" />
                  </linearGradient>
                </defs>
                {/* <Text>{cellsLeft.any}</Text> */}
              </Hexagon>
            ) : (
              <Hexagon
                key={index}
                q={index}
                r={0}
                s={0 - index}
                className={item}
              ></Hexagon>
            )
          )}
          {/* <Hexagon q={0} r={0} s={0} className={deal[0]}></Hexagon>
          <Hexagon q={1} r={0} s={-1} className={deal[1]}></Hexagon> */}
        </Layout>
      </HexGrid>
      <div className="turnProgressContainer">
        <div className="turnProgress" style={{ width: `${width + "%"}` }}></div>
      </div>
    </div>
  );
};

export default TurnHexes;
