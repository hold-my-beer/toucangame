import React from "react";

const BonusPoints = ({ roundPoints }) => {
  const bonusPoints = roundPoints.length
    ? [
        ...roundPoints[roundPoints.length - 1].bonusCityPoints,
        ...roundPoints[roundPoints.length - 1].bonusArtefactPoints,
      ]
    : [];

  return (
    <div className="bonusPoints">
      <div className="bonusPointValue">
        {bonusPoints.length >= 1 ? bonusPoints[0].pts : ""}
      </div>
      <div className="bonusPointValue">
        {bonusPoints.length >= 2 ? bonusPoints[1].pts : ""}
      </div>
      <div className="bonusPointValue">
        {bonusPoints.length >= 3 ? bonusPoints[2].pts : ""}
      </div>
      <div className="bonusPointValue">
        {bonusPoints.length >= 4 ? bonusPoints[3].pts : ""}
      </div>
      <div className="bonusPointValue">
        {bonusPoints.length >= 5 ? bonusPoints[4].pts : ""}
      </div>
      <div className="bonusPointValue">
        {bonusPoints.length >= 6 ? bonusPoints[5].pts : ""}
      </div>
    </div>
  );
};

export default BonusPoints;
