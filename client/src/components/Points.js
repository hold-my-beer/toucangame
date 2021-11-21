import React from "react";
import ArtefactPoints from "./ArtefactPoints";
import CityPoints from "./CityPoints";
import BonusPoints from "./BonusPoints";
import TotalPoints from "./TotalPoints";

const Points = ({ turn, game }) => {
  return (
    <div className="points">
      <ArtefactPoints
        isMinor={game.isMinor}
        artefacts={game.artefacts}
        artefactPoints={
          turn.roundPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].artefactPoints
            : []
        }
      />

      <CityPoints
        isMinor={game.isMinor}
        cities={game.cities}
        cityPoints={
          turn.roundPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].cityPoints
            : []
        }
      />

      {/* <div className="otherPoints"> */}
      <BonusPoints roundPoints={turn.roundPoints} />

      <TotalPoints roundPoints={turn.roundPoints} isMinor={game.isMinor} />
      {/* </div> */}
    </div>
  );
};

export default Points;
