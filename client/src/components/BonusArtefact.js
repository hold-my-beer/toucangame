import React from "react";
import {
  OBELISK,
  BOOK,
  TOUCAN,
  YETI,
  DRAGON,
} from "../constants/artefactConstants";

const BonusArtefact = ({ artefact }) => {
  const getBonusArtefact = (name) => {
    switch (name) {
      case "obelisk":
        return OBELISK;
      case "book":
        return BOOK;
      case "toucan":
        return TOUCAN;
      case "yeti":
        return YETI;
      case "dragon":
        return DRAGON;
      default:
        return OBELISK;
    }
  };

  return (
    <div className="bonusArtefact mb-1">
      <h4 className="text-center mb-1">Призовой артефакт</h4>
      <div className="bonusArtefactCard">
        <div className="bonusArtefactImage">
          <img src={getBonusArtefact(artefact.name)} alt={artefact.name} />
        </div>
        <div className="bonusArtefactPoints">
          <span>{artefact.points.toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BonusArtefact;
