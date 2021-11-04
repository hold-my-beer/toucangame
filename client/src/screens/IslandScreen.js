import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GameData from "../components/GameData";
import Grid from "../components/Grid";
import Points from "../components/Points";
import { getGame } from "../actions/gameActions";
import { listUsers } from "../actions/userActions";
import { updateStats } from "../actions/userActions";

const IslandScreen = ({ history }) => {
  const dispatch = useDispatch();

  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game } = gameGet;

  const gameUpdateTurn = useSelector((state) => state.gameUpdateTurn);
  const { loading: loadingTurn, error: errorTurn, turn } = gameUpdateTurn;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingList, error: errorList, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin;

  const getGameHandler = (game) => {
    dispatch(getGame(game, userInfo.id));
  };

  const getNewRoundHandler = (game) => {
    dispatch(getGame(game, userInfo.id));
    history.push("/results");
  };

  const getUsersHandler = ({ users, newStats }) => {
    // console.log(newStats);
    if (newStats) {
      // console.log("newStats");
      const userIndex = users.findIndex((user) => user.id === userInfo.id);

      if (userIndex !== -1) {
        const stats = users[userIndex].stats;

        dispatch(updateStats(stats));
      }
    }

    dispatch(listUsers(users, userInfo.id));
  };

  useEffect(() => {
    socket.on("getUsers", getUsersHandler);

    return () => socket.off("getUsers", getUsersHandler);
  });

  useEffect(() => {
    socket.on("getGame", getGameHandler);

    return () => {
      socket.off("getGame", getGameHandler);
    };
  });

  useEffect(() => {
    socket.on("getNewRound", getNewRoundHandler);

    return () => {
      socket.off("getNewRound", getNewRoundHandler);
    };
  });

  // useEffect(() => {
  //   if (game_ && game_.roundNumber > 1 && game_.turnNumber === 1) {
  //     history.push("./results");
  //   }
  // }, [game_, history]);

  return (
    <div className="islandScreen">
      {loading || loadingTurn || loadingList || loadingUser ? (
        <Loader />
      ) : error || errorTurn || errorList || errorUser ? (
        <Message className="danger" text={error} />
      ) : (
        <>
          {game && (
            <>
              <GameData game={game} />
              <Grid
                // isMinor={game.isMinor}
                // cityScenario={game.cityScenario}
                // deal={game.deal}
                turn={turn}
                game={game}
                users={users}
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
        </>
      )}
    </div>
  );
};

export default IslandScreen;
