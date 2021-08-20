import React from "react";

import GameField from "../components/GameField";
import PointsField from "../components/PointsField";

const MinorIslandScreen = () => {
  return (
    <div className="islandScreen">
      <GameField />
      <PointsField />
    </div>
  );
};

export default MinorIslandScreen;
