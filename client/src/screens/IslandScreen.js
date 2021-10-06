import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GameData from "../components/GameData";
import Grid from "../components/Grid";
import Points from "../components/Points";

const IslandScreen = () => {
  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  const gameUpdateTurn = useSelector((state) => state.gameUpdateTurn);
  const { loading: loadingTurn, error: errorTurn, turn } = gameUpdateTurn;

  return (
    <div className="islandScreen">
      {loading || loadingTurn ? (
        <Loader />
      ) : error || errorTurn ? (
        <Message className="danger" text={error} />
      ) : (
        <>
          <GameData game={game} />
          <Grid
            // isMinor={game.isMinor}
            // cityScenario={game.cityScenario}
            // deal={game.deal}
            turn={turn}
            game={game}
          />
          <Points
            // isMinor={game.isMinor}
            // artefacts={game.artefacts}
            // cities={game.cities}
            turn={turn}
            game={game}
          />
        </>
      )}
    </div>
  );
};

export default IslandScreen;
