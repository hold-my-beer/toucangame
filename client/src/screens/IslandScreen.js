import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GameData from "../components/GameData";
import Island from "../components/Island";
import Points from "../components/Points";

const IslandScreen = () => {
  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  return (
    <div className="islandScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="danger" text={error} />
      ) : (
        <>
          <GameData game={game} />
          <Island cities={game.cities} deal={game.deal} />
          <Points />
        </>
      )}
    </div>
  );
};

export default IslandScreen;
