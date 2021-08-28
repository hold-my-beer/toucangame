import React from "react";
import { Link } from "react-router-dom";

const LandingScreen = () => {
  return (
    <div className="landing">
      <h1 className="x-large">Добро пожаловать в Тропы Туканы!</h1>
      <p className="lead">Выберите дальнешее действие:</p>
      <Link className="btn btn-primary" to="/minor-island">
        Играть немедленно
      </Link>
      <Link className="btn btn-success" to="/login">
        Войти и пригласить друзей
      </Link>
    </div>
  );
};

export default LandingScreen;
