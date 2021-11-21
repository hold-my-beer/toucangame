import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socket from "../config/socket";
// import Message from "./Message";
// import Loader from "./Loader";
import TurnHexes from "./TurnHexes";
import CellsLeft from "./CellsLeft";
import ArtefactBonus from "./ArtefactBonus";
import CityBonuses from "./CityBonuses";
import Opponents from "./Opponents";
// import { getGame } from "../actions/gameActions";

const GameData = ({ game }) => {
  return (
    <div className="gameData">
      <div className="roundNumber">
        <span>Раунд: {game.roundNumber}</span>
      </div>

      <div className="turnNumber">
        <span>Ход: {game.turnNumber}</span>
      </div>
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
      <ArtefactBonus bonusArtefact={game.bonusArtefact} />
      <CityBonuses cities={game.cities} playersNumber={game.players.length} />
      {/* <Opponents users={game.players} /> */}
    </div>
  );
};

export default GameData;
