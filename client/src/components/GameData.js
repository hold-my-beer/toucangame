import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socket from "../config/socket";
// import Message from "./Message";
// import Loader from "./Loader";
// import TurnHexes from "./TurnHexes";
import CellsLeft from "./CellsLeft";
import ArtefactBonus from "./ArtefactBonus";
import CityBonuses from "./CityBonuses";
import Opponents from "./Opponents";
// import { getGame } from "../actions/gameActions";

const GameData = ({ game, turn }) => {
  return (
    <div className="gameData">
      <Opponents users={game.players} />
      <div className="roundNumber">
        <span>Раунд: {game.roundNumber}</span>
      </div>

      {/* <div className="turnNumber">
        <span>Ход: {game.turnNumber}</span>
      </div> */}
      {/* <div className="locations">
        <span>Локации:</span>
      </div> */}
      {/* <TurnHexes
        deal={game.deal}
        roundNumber={game.roundNumber}
        turnNumber={game.turnNumber}
        isBonusMove={game.isBonusMove}
      /> */}
      <CellsLeft cellsLeft={game.cellsLeft} />
      {/* <div className="bonuses">
        <span>Бонусы:</span>
      </div> */}
      {/* {game.isBonusMove ? (
        <div className="turnNumber">
          <span>Бонусный ход</span>
        </div>
      ) : (
        <div className="turnNumber">
          <span>Ход: {game.turnNumber}</span>
        </div>
      )} */}
      <ArtefactBonus
        bonusArtefact={game.bonusArtefact}
        wonBonusArtefactNames={
          turn.roundPoints.length
            ? turn.roundPoints[
                turn.roundPoints.length - 1
              ].bonusArtefactPoints.map((item) => item.name)
            : []
        }
      />
      <CityBonuses
        cities={game.cities}
        playersNumber={game.players.length}
        wonBonusCityNames={
          turn.roundPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].bonusCityPoints.map(
                (item) => item.name
              )
            : []
        }
      />
    </div>
  );
};

export default GameData;
