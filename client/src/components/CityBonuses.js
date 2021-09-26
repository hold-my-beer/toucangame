import React from "react";
import CityBonus from "./CityBonus";

const CityBonuses = ({ cities, playersNumber }) => {
  return (
    <div className="cityBonuses mb-1">
      <h4 className="text-center mb-1">Бонусы за города</h4>
      <div className="cityBonusItems">
        {cities.map((city, index) => (
          <CityBonus key={index} city={city} playersNumber={playersNumber} />
        ))}
      </div>
    </div>
  );
};

export default CityBonuses;
