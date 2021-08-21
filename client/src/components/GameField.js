import React from "react";

import CellsLeft from "./CellsLeft";
import Compass from "./Compass";
import Field from "./Field";

const GameField = () => {
  return (
    <div className="gameField">
      <h3 className="center mb-3">Малый остров</h3>
      <CellsLeft />
      {/*<Compass /> */}
      <Field />
    </div>
  );
};

export default GameField;
