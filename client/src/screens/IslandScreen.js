import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GameData from "../components/GameData";
import Grid from "../components/Grid";
// import ProgressBar from "../components/ProgressBar";
import Points from "../components/Points";
import { getGame } from "../actions/gameActions";
import { listUsers } from "../actions/userActions";
import { updateStats } from "../actions/userActions";
import { getRandomIntInclusive } from "../utils/index";

const IslandScreen = ({ history }) => {
  const [audioSource, setAudioSource] = useState("");

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

    // const id = setTimeout(() => {
    history.push("/results");
    // }, 3000);

    // return () => clearTimeout(id);
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
    const islandBackgroundMusic = document.getElementById(
      "islandBackgroundMusic"
    );

    if (islandBackgroundMusic && userInfo) {
      islandBackgroundMusic.volume =
        parseInt(userInfo.settings.musicVolume) / 100;

      const audioSources = [
        "audio/bensound-ukulele.mp3",
        "audio/bensound-cute.mp3",
        "audio/bensound-littleidea.mp3",
      ];

      let index = getRandomIntInclusive(0, audioSources.length - 1);
      // console.log(index);

      const playNext = () => {
        index = (index + 1) % audioSources.length;
        // islandBackgroundMusic.src = audioSources[index];
        setAudioSource(audioSources[index]);
        // islandBackgroundMusic.play();
      };

      // islandBackgroundMusic.src = audioSources[index];
      setAudioSource(audioSources[index]);

      // islandBackgroundMusic.play();

      islandBackgroundMusic.addEventListener("ended", playNext);
    }
  }, [userInfo]);

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
      <audio
        id="islandBackgroundMusic"
        // src="audio/bensound-ukulele.mp3"
        src={audioSource}
        autoPlay={true}
        // preload="auto"
        // loop={true}
      ></audio>
      {loading || loadingTurn || loadingList || loadingUser ? (
        <Loader text="Подождите, игра запускается" />
      ) : error || errorTurn || errorList || errorUser ? (
        <Message className="danger" text={error} />
      ) : (
        <>
          {/* <h2 className="text-center mb-1">
            {game.isMinor ? "Малый остров" : "Большой остров"}
          </h2> */}
          {game && (
            <>
              <GameData game={game} turn={turn} />
              <Grid
                // isMinor={game.isMinor}
                // cityScenario={game.cityScenario}
                // deal={game.deal}
                turn={turn}
                game={game}
                users={users}
                userInfo={userInfo}
              />
              {/* <ProgressBar /> */}
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
