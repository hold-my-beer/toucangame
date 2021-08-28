import React from "react";

import CellsLeft from "./CellsLeft";
import TurnHexes from "./TurnHexes";
import Grid from "./Grid";

const Island = () => {
  return (
    <div className="island">
      <h3 className="center mb-3">Малый остров</h3>
      <CellsLeft />
      <TurnHexes />
      <Grid />
    </div>
  );
};

export default Island;
