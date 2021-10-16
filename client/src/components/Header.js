import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import { GAME_GET_RESET } from "../constants/gameConstants";
import { GAME_UPDATE_TURN_RESET } from "../constants/gameConstants";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const gameGet = useSelector((state) => state.gameGet);
  const { game } = gameGet;

  const logoutHandler = () => {
    dispatch(logout());
    socket.emit("userLogout");
  };

  const quitGameHandler = () => {
    socket.emit("quitGame", game.id);

    dispatch({ type: GAME_GET_RESET });

    dispatch({ type: GAME_UPDATE_TURN_RESET });
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Тропы Туканы</h1>
      </Link>
      {userInfo ? (
        game && game.isActive ? (
          <Link to="/users" onClick={quitGameHandler}>
            Выход из игры
          </Link>
        ) : (
          <Link to="/" onClick={logoutHandler}>
            Выход
          </Link>
        )
      ) : (
        <Link to="/login">Вход</Link>
      )}
    </nav>
  );
};

export default Header;
