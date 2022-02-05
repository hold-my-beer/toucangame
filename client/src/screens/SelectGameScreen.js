import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import { TOUCAN, YETI } from "../constants/artefactConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { GAME_SET_LOADING } from "../constants/gameConstants";
import { getGame } from "../actions/gameActions";
import { setModal } from "../actions/modalActions";

const SelectGameScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const randomGameHandler = () => {
    // socket.emit("launchGame", groupId);
    const launchMinorRandomGame = () => {
      // console.log("launch");
      socket.emit("addRandomUser", {
        user: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          stats: userInfo.stats,
        },
        isMinor: true,
      });
      dispatch({
        type: GAME_SET_LOADING,
      });
      history.push("/island");
    };

    const launchMajorRandomGame = () => {
      socket.emit("addRandomUser", {
        user: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          stats: userInfo.stats,
        },
        isMinor: false,
      });
      dispatch({
        type: GAME_SET_LOADING,
      });
      history.push("/island");
    };

    const buttons = [
      {
        className: "primary",
        text: "Малая игра",
        clickHandler: launchMinorRandomGame,
      },
      {
        className: "primary",
        text: "Большая игра",
        clickHandler: launchMajorRandomGame,
      },
    ];

    dispatch(
      setModal({
        isVisible: true,
        text: "Выберите тип игры",
        buttons,
      })
    );
  };

  // const randomGameHandler = () => {
  //   launchRandomGameHandler();
  //   history.push("/random-game");
  // };

  const selectUsersHandler = () => {
    history.push("/users");
  };

  // const getGameHandler = (game) => {
  //   // console.log("game received");
  //   dispatch(getGame(game, userInfo.id));
  //   // history.push("/island");
  // };

  // useEffect(() => {
  //   socket.on("getGame", getGameHandler);

  //   return () => socket.off("getGame", getGameHandler);
  // });

  return (
    <div className="selectGame">
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message className="danger" text={error} />
        ) : (
          <div className="randomGame" onClick={randomGameHandler}>
            <div className="selectGameImg">
              <img src={TOUCAN} alt="Тукан" />
            </div>
            <div className="selectGameText">
              <span>Играть немедленно</span>
            </div>
          </div>
        )}
      </>

      <div className="selectUsersGame" onClick={selectUsersHandler}>
        <div className="selectGameImg">
          <img src={YETI} alt="Йети" />
        </div>
        <div className="selectGameText">
          <span>Сначала выбрать игроков</span>
        </div>
      </div>
    </div>
  );
};

export default SelectGameScreen;
