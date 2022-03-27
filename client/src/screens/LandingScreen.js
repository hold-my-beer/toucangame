import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../config/socket";

const LandingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.id) {
      const user = {
        id: userInfo.id,
        name: userInfo.name,
        friends: userInfo.friends,
        stats: userInfo.stats,
      };
      socket.emit("userLogin", user);

      history.push("/profile");
    }
  }, [history, userInfo]);

  return (
    <div className="landing">
      <h1 className="x-large">Тропы Туканы</h1>
      {/* <p className="lead">Выберите дальнейшее действие:</p> */}
      {/* <Link className="btn btn-primary" to="/minor-island">
        Играть немедленно
      </Link> */}
      <Link className="btn btn-primary" to="/login">
        Войти в учетную запись
      </Link>
      {/* <p>
        <small>* - позволяет сохранять достижения и играть с друзьями</small>
      </p> */}
    </div>
  );
};

export default LandingScreen;
