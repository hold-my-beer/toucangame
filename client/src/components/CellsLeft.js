import React from "react";
import { HexGrid, Layout, Text, Hexagon } from "react-hexgrid";

const CellsLeft = ({ cellsLeft }) => {
  return (
    <div className="cellsLeft">
      <h4 className="text-center">Осталось карточек</h4>
      <HexGrid width={150} height={50} viewBox="0 -25 20 20">
        <Layout
          size={{ x: 5, y: 5 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={-2} s={2} className="sand">
            <Text>{cellsLeft.sand.toString()}</Text>
          </Hexagon>
          <Hexagon q={1} r={-2} s={1} className="forest">
            <Text>{cellsLeft.forest.toString()}</Text>
          </Hexagon>
          <Hexagon q={2} r={-2} s={0} className="stone">
            <Text>{cellsLeft.stone.toString()}</Text>
          </Hexagon>
          <Hexagon q={3} r={-2} s={-1} className="water">
            <Text>{cellsLeft.water.toString()}</Text>
          </Hexagon>
          <Hexagon q={4} r={-2} s={-2} className="any" fill="MyGradient">
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
            <Text>{cellsLeft.any.toString()}</Text>
          </Hexagon>
        </Layout>
      </HexGrid>
    </div>
  );
};

export default CellsLeft;
