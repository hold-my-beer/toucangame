import React from "react";
import ArtefactPoints from "./ArtefactPoints";
import CityPoints from "./CityPoints";
import BonusPoints from "./BonusPoints";
import TotalPoints from "./TotalPoints";

const Points = ({ turn, game }) => {
  return (
    <div className="points">
      {/* Artefact Points */}
      <ArtefactPoints isMinor={game.isMinor} artefacts={game.artefacts} />

      {/* City Points */}
      <CityPoints isMinor={game.isMinor} cities={game.cities} />
      {/* <div className="cityPoints">
        <div className="cityPointsItem">
          <div className="cityPointsFrom">А</div>
          <div className="cityPointsTo">А</div>
          <div className="cityPointsValue">14</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Б</div>
          <div className="cityPointsTo">Б</div>
          <div className="cityPointsValue">13</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">В</div>
          <div className="cityPointsTo">В</div>
          <div className="cityPointsValue">12</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Г</div>
          <div className="cityPointsTo">Г</div>
          <div className="cityPointsValue">11</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Д</div>
          <div className="cityPointsTo">Д</div>
          <div className="cityPointsValue">10</div>
        </div>
      </div> */}

      {/* Bonus and Total Points */}
      <div className="otherPoints">
        <BonusPoints roundPoints={turn.roundPoints} />
        {/* <div className="bonusPoints">
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
        </div> */}
        <TotalPoints roundPoints={turn.roundPoints} />
        {/* <div className="totalPoints">
          <div className="totalPointsItem totalFirstRoundArtefactPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalSecondRoundArtefactPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalCityPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalBonusPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalOverallPoints">
            <div className="totalPointValue"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Points;
