import React from "react";
import { getArtefactConstant } from "../utils";

const ArtefactPointsItem = ({ isMinor, artefact, awardedPoints }) => {
  // console.log(awardedPoints);
  return (
    <div className="artefactPointsItem">
      <div className="mr-1 artefactPointsPicture">
        <img src={getArtefactConstant(artefact.name)} alt={artefact.name} />
      </div>
      {isMinor ? (
        <>
          <div
            className={`mr-1 artefactPointsValueCircle ${
              awardedPoints.totalQty >= 1 ? "won" : ""
            }`}
          >
            {artefact.points.minor[0]}
          </div>
          <div
            className={`artefactPointsValueRectangle ${
              awardedPoints.totalQty >= 2 ? "won" : ""
            }`}
          >
            {artefact.points.minor[1]}+
          </div>
        </>
      ) : (
        <>
          <div
            className={`mr-1 artefactPointsValueCircle ${
              awardedPoints.totalQty >= 1 ? "won" : ""
            }`}
          >
            {artefact.points.major[0]}
          </div>
          <div
            className={`mr-1 artefactPointsValueCircle ${
              awardedPoints.totalQty >= 2 ? "won" : ""
            }`}
          >
            {artefact.points.major[1]}
          </div>
          <div
            className={`artefactPointsValueRectangle ${
              awardedPoints.totalQty >= 3 ? "won" : ""
            }`}
          >
            {artefact.points.major[2]}+
          </div>
        </>
      )}
    </div>
  );
};

export default ArtefactPointsItem;
