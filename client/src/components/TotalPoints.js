import React from "react";

const TotalPoints = ({ roundPoints, isMinor }) => {
  const totalFirstRoundArtefactPoints =
    roundPoints.length >= 1
      ? roundPoints[0].artefactPoints
          .map((item) => item.pts)
          .reduce((acc, cur) => {
            return acc + cur;
          }, 0)
      : 0;

  const totalSecondRoundArtefactPoints =
    roundPoints.length >= 2
      ? roundPoints[1].artefactPoints
          .map((item) => item.pts)
          .reduce((acc, cur) => {
            return acc + cur;
          }, 0)
      : // - totalFirstRoundArtefactPoints
        0;

  const totalThirdRoundArtefactPoints =
    roundPoints.length === 3
      ? roundPoints[2].artefactPoints
          .map((item) => item.pts)
          .reduce((acc, cur) => {
            return acc + cur;
          }, 0)
      : // - totalFirstRoundArtefactPoints
        0;

  const totalCityPoints = roundPoints.length
    ? roundPoints[roundPoints.length - 1].cityPoints
        .map((item) => item.pts)
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0)
    : 0;

  const totalBonusPoints = roundPoints.length
    ? [
        ...roundPoints[roundPoints.length - 1].bonusCityPoints,
        ...roundPoints[roundPoints.length - 1].bonusArtefactPoints,
      ]
        .map((item) => item.pts)
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0)
    : 0;

  const totalOverallPoints =
    totalFirstRoundArtefactPoints +
    totalSecondRoundArtefactPoints +
    totalThirdRoundArtefactPoints +
    totalCityPoints +
    totalBonusPoints;

  return (
    <div className="totalPoints">
      <div className="totalRoundPoints">
        <div className="artefactPointsBackground"></div>
        <div className="totalPointsItem totalFirstRoundArtefactPoints">
          <div className="totalPointValue">
            {totalFirstRoundArtefactPoints ? totalFirstRoundArtefactPoints : ""}
          </div>
        </div>
        <div className="totalPointsItem totalSecondRoundArtefactPoints">
          <div className="totalPointValue">
            {totalSecondRoundArtefactPoints
              ? totalSecondRoundArtefactPoints
              : ""}
          </div>
        </div>
        {!isMinor && (
          <div className="totalPointsItem totalThirdRoundArtefactPoints">
            <div className="totalPointValue">
              {totalThirdRoundArtefactPoints
                ? totalThirdRoundArtefactPoints
                : ""}
            </div>
          </div>
        )}
      </div>
      <div className="totalNonRoundPoints">
        <div className="totalPointsItem totalCityPoints">
          <div className="cityPointsBackground"></div>
          <div className="totalPointValue">
            {totalCityPoints ? totalCityPoints : ""}
          </div>
        </div>
        <div className="totalPointsItem totalBonusPoints">
          <div className="bonusPointsBackground"></div>
          <div className="totalPointValue">
            {totalBonusPoints ? totalBonusPoints : ""}
          </div>
        </div>
        <div className="totalPointsItem totalOverallPoints">
          <div className="totalPointsBackground"></div>
          <div className="totalPointValue">
            {totalOverallPoints ? totalOverallPoints : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPoints;
