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
    // console.log(socket);
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
      <ul className="navList">
        {/* <li> */}
        {/* <Link to="/settings">
            <span>Настройки</span> <i class="fas fa-sliders-h"></i>
          </Link> */}
        {/* </li> */}
        {/* <li> */}
        {userInfo ? (
          <>
            <li>
              <Link to="/settings">
                <span>Настройки</span> <i className="fas fa-sliders-h"></i>
              </Link>
            </li>
            <li>
              {game && game.isActive ? (
                <Link to="/users" onClick={quitGameHandler}>
                  <span>Выход из игры</span>{" "}
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              ) : (
                <Link to="/" onClick={logoutHandler}>
                  <span>Выход</span> <i className="fas fa-sign-out-alt"></i>
                </Link>
              )}
            </li>
          </>
        ) : (
          <Link to="/login">
            <span>Вход</span> <i className="fas fa-sign-in-alt"></i>
          </Link>
        )}
        {/* </li> */}
      </ul>
    </nav>
  );
};

export default Header;
