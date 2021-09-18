import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    socket.emit("userLogout");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Тропы Туканы</h1>
      </Link>
      {userInfo ? (
        <Link to="/" onClick={logoutHandler}>
          Выход
        </Link>
      ) : (
        <Link to="/login">Вход</Link>
      )}
    </nav>
  );
};

export default Header;
