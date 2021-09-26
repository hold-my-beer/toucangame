import React from "react";

const CityBonus = ({ city, playersNumber }) => {
  return (
    <div
      className={`cityBonusCard ${
        playersNumber < 5
          ? city.bonusAwarded[0] && "awarded"
          : city.bonusAwarded[0] && city.bonusAwarded[1] && "awarded"
      }`}
    >
      <span className="cityBonusHeader">{city.name}</span>
      <span>
        {playersNumber < 5
          ? city.bonusPoints[0]
          : !city.bonusAwarded[0]
          ? city.bonusPoints[0]
          : city.bonusPoints[1]}
      </span>
    </div>
  );
};

export default CityBonus;
