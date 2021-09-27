import React from "react";
import { getBonusArtefact } from "../utils";

const ArtefactPointsItem = ({ isMinor, artefact }) => {
  return (
    <div className="artefactPointsItem">
      <div className="mr-1 artefactPointsPicture">
        <img src={getBonusArtefact(artefact.name)} alt={artefact.name} />
      </div>
      {isMinor ? (
        <>
          <div className="mr-1 artefactPointsValueCircle">
            {artefact.points.minor[0]}
          </div>
          <div className="artefactPointsValueRectangle">
            {artefact.points.minor[1]}+
          </div>
        </>
      ) : (
        <>
          <div className="mr-1 artefactPointsValueCircle">
            {artefact.points.major[0]}
          </div>
          <div className="mr-1 artefactPointsValueCircle">
            {artefact.points.major[1]}
          </div>
          <div className="artefactPointsValueRectangle">
            {artefact.points.major[2]}+
          </div>
        </>
      )}
    </div>
  );
};

export default ArtefactPointsItem;
