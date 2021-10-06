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
      <TurnHexes deal={game.deal} />
      <CellsLeft cellsLeft={game.cellsLeft} />
      <ArtefactBonus bonusArtefact={game.bonusArtefact} />
      <CityBonuses cities={game.cities} playersNumber={game.players.length} />
      <Opponents users={game.players} />
    </div>
  );
};

export default GameData;
