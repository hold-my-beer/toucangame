import React from "react";

import CellsLeft from "./CellsLeft";
import Compass from "./Compass";
import Grid from "./Grid";

const Island = () => {
  return (
    <div className="island">
      <h3 className="center mb-3">Малый остров</h3>
      <CellsLeft />
      {/*<Compass /> */}
      <Grid />
    </div>
  );
};

export default Island;
