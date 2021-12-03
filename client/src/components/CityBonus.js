import React from "react";

const CityBonus = ({ city, playersNumber, isWon }) => {
  return (
    <div
      className={`cityBonusCard ${
        playersNumber < 5
          ? city.bonusAwarded[0]
            ? isWon
              ? "won"
              : "awarded"
            : ""
          : city.bonusAwarded[0] && city.bonusAwarded[1]
          ? isWon
            ? "won"
            : "awarded"
          : ""
      }`}
    >
      <div>
        <span className="cityBonusHeader">{city.name}</span>
      </div>
      <div>
        <span>
          {playersNumber < 5
            ? city.bonusPoints[0]
            : !city.bonusAwarded[0]
            ? city.bonusPoints[0]
            : city.bonusPoints[1]}
        </span>
      </div>
    </div>
  );
};

export default CityBonus;
