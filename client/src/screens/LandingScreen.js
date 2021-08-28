import React from "react";
import { Link } from "react-router-dom";

const LandingScreen = () => {
  return (
    <div className="landing">
      <h1 className="x-large">Добро пожаловать в Тропы Туканы!</h1>
      <p className="lead">Выберите дальнейшее действие:</p>
      <Link className="btn btn-primary" to="/minor-island">
        Играть немедленно
      </Link>
      <Link className="btn btn-success" to="/login">
        Войти в учетную запись*
      </Link>
      <p>
        <small>* - позволяет сохранять достижения и играть с друзьями</small>
      </p>
    </div>
  );
};

export default LandingScreen;
