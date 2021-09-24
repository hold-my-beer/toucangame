import React from "react";

// import CellsLeft from "./CellsLeft";
// import TurnHexes from "./TurnHexes";
import Grid from "./Grid";

const Island = ({ cities, deal }) => {
  return (
    <div className="island">
      <h2 className="text-center my-1 mb-2">Малый остров</h2>
      {/* <CellsLeft /> */}
      {/* <TurnHexes /> */}
      <Grid cities={cities} deal={deal} />
    </div>
  );
};

export default Island;
