import React from "react";
import CityBonus from "./CityBonus";

const CityBonuses = ({ cities, playersNumber, wonBonusCityNames }) => {
  return (
    <div className="cityBonuses">
      {/* <h4 className="text-center">Бонусы за города:</h4> */}
      <div className="cityBonusItems">
        {cities.map((city, index) => (
          <CityBonus
            key={index}
            city={city}
            playersNumber={playersNumber}
            isWon={wonBonusCityNames.indexOf(city.name) !== -1 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default CityBonuses;
