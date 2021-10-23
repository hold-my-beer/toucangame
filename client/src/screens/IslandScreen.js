import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GameData from "../components/GameData";
import Grid from "../components/Grid";
import Points from "../components/Points";
import { getGame } from "../actions/gameActions";

const IslandScreen = ({ history }) => {
  const dispatch = useDispatch();

  const gameGet = useSelector((state) => state.gameGet);
  const { loading, error, game: game_ } = gameGet;

  const gameUpdateTurn = useSelector((state) => state.gameUpdateTurn);
  const { loading: loadingTurn, error: errorTurn, turn } = gameUpdateTurn;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingList, error: errorList, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin;

  useEffect(() => {
    socket.on("getGame", (game) => {
      // console.log(game);
      dispatch(getGame(game, userInfo.id));
    });

    return socket.off("getGame", (game) => {
      dispatch(getGame(game, userInfo.id));
    });
  }, [dispatch, userInfo.id]);

  useEffect(() => {
    socket.on("getNewRound", (game) => {
      // console.log(game);
      dispatch(getGame(game, userInfo.id));
      history.push("/results");
    });

    return socket.off("getNewRound", (game) => {
      dispatch(getGame(game, userInfo.id));
      history.push("/results");
    });
  }, [dispatch, userInfo.id, history]);

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
          {game_ && (
            <>
              <GameData game={game_} />
              <Grid
                // isMinor={game.isMinor}
                // cityScenario={game.cityScenario}
                // deal={game.deal}
                turn={turn}
                game={game_}
                users={users}
              />
              <Points
                // isMinor={game.isMinor}
                // artefacts={game.artefacts}
                // cities={game.cities}
                turn={turn}
                game={game_}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default IslandScreen;
