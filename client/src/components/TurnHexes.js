import React from "react";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";

const TurnHexes = () => {
  return (
    <div className="turnHexes">
      <HexGrid width={140} height={80} viewBox="-2 -9 17 17">
        <Layout
          size={{ x: 7, y: 7 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={0} s={0} className="sand"></Hexagon>
          <Hexagon q={1} r={0} s={-1} className="forest"></Hexagon>
        </Layout>
      </HexGrid>
    </div>
  );
};

export default TurnHexes;
