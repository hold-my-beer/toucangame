import React from "react";
import ArtefactPointsItem from "./ArtefactPointsItem";

const ArtefactPoints = ({ isMinor, artefacts, artefactPoints }) => {
  const awardedPoints = [];
  artefacts.forEach((artefact) => {
    const artefactPointIndex = artefactPoints.findIndex(
      (item) => item.name === artefact.name
    );

    if (artefactPointIndex === -1) {
      awardedPoints.push([]);
    } else {
      awardedPoints.push(artefactPoints[artefactPointIndex]);
    }
  });

  return (
    <div className="artefactPoints">
      {artefacts.map((artefact, index) => (
        <ArtefactPointsItem
          key={index}
          isMinor={isMinor}
          artefact={artefact}
          awardedPoints={awardedPoints[index]}
        />
      ))}
    </div>
  );
};

export default ArtefactPoints;
