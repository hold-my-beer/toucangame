import React from "react";
// import {
//   OBELISK,
//   BOOK,
//   TOUCAN,
//   YETI,
//   DRAGON,
// } from "../constants/artefactConstants";
import { getBonusArtefact } from "../utils";

const ArtefactBonus = ({ bonusArtefact }) => {
  // const getBonusArtefact = (name) => {
  //   switch (name) {
  //     case "obelisk":
  //       return OBELISK;
  //     case "book":
  //       return BOOK;
  //     case "toucan":
  //       return TOUCAN;
  //     case "yeti":
  //       return YETI;
  //     case "dragon":
  //       return DRAGON;
  //     default:
  //       return OBELISK;
  //   }
  // };

  return (
    <div className="bonusArtefact mb-1">
      <h4 className="text-center mb-1">Призовой артефакт</h4>
      <div
        className={`bonusArtefactCard ${
          bonusArtefact.bonusAwarded && "awarded"
        }`}
      >
        <div className="bonusArtefactImage">
          <img
            src={getBonusArtefact(bonusArtefact.name)}
            alt={bonusArtefact.name}
          />
        </div>
        <div className="bonusArtefactPoints">
          <span>{bonusArtefact.bonusPoints}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtefactBonus;
