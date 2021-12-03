import React from "react";
// import {
//   OBELISK,
//   BOOK,
//   TOUCAN,
//   YETI,
//   DRAGON,
// } from "../constants/artefactConstants";
import { getBonusArtefact } from "../utils";

const ArtefactBonus = ({ bonusArtefact, wonBonusArtefactNames }) => {
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
    <div className="bonusArtefact">
      {/* <h4 className="text-center">Призовой артефакт:</h4> */}
      <div
        className={`bonusArtefactCard ${
          bonusArtefact.bonusAwarded
            ? wonBonusArtefactNames.indexOf(bonusArtefact.name) !== -1
              ? "won"
              : "awarded"
            : ""
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
