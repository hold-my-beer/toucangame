import React from "react";
import { HexGrid, Layout, Text, Hexagon } from "react-hexgrid";

const CellsLeft = () => {
  return (
    <div className="cellsLeft">
      <HexGrid width={50} height={150} viewBox="-10 -10 20 20">
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          spacing={1.3}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={-2} s={2} className="sand">
            <Text>8</Text>
          </Hexagon>
          <Hexagon q={0} r={-1} s={1} className="forest">
            <Text>7</Text>
          </Hexagon>
          <Hexagon q={0} r={0} s={0} className="stone">
            <Text>6</Text>
          </Hexagon>
          <Hexagon q={0} r={1} s={-1} className="water">
            <Text>4</Text>
          </Hexagon>
          <Hexagon q={0} r={2} s={-2} className="multi" fill="MyGradient">
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
            <Text>2</Text>
          </Hexagon>
        </Layout>
      </HexGrid>
    </div>
  );
};

export default CellsLeft;
