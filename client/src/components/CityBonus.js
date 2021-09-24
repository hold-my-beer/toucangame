import React from "react";

const CityBonus = ({ city }) => {
  return (
    <div className="cityBonusCard">
      <span className="cityBonusHeader">{city.name}</span>
      <span>{city.points}</span>
    </div>
  );
};

export default CityBonus;
