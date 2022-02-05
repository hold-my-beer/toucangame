import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import { setModal } from "../actions/modalActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/select-game");
    }
  }, [userInfo, history]);

  // const postLoginHandler = () => {
  //   const launchRandomPlay = () => {
  //     history.push("/randomusers");
  //   };

  //   const launchPlayerChoice = (user) => {
  //     socket.emit("userLogin", user);
  //     history.push("/users");
  //   };

  //   const buttons = [
  //     {
  //       className: "primary",
  //       text: "Играть немедленно",
  //       clickHandler: launchRandomPlay,
  //     },
  //     {
  //       className: "primary",
  //       text: "Сначала выбрать игроков",
  //       clickHandler: launchPlayerChoice,
  //     },
  //   ];

  //   dispatch(
  //     setModal({
  //       isVisible: true,
  //       text: "Выберите дальнейшее действие",
  //       buttons,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (userInfo && userInfo.id) {
  //     const user = {
  //       id: userInfo.id,
  //       name: userInfo.name,
  //       friends: userInfo.friends,
  //       stats: userInfo.stats,
  //     };
  //     socket.emit("userLogin", user);

  //     history.push("/users");
  //   }
  // }, [history, userInfo]);

  // useEffect(() => {
  //   // if (userInfo && userInfo.id) {
  //   //   const user = {
  //   //     id: userInfo.id,
  //   //     name: userInfo.name,
  //   //     friends: userInfo.friends,
  //   //     stats: userInfo.stats,
  //   //   };

  //   //   history.push("/select-game");
  //   //   // socket.emit("userLogin", user);

  //   //   // history.push("/users");

  //   //   // const launchRandomPlay = () => {
  //   //   //   const launchRandomMinorGame = () => {
  //   //   //     socket.emit("launchRandomGame", { user, isMinor: true });
  //   //   //   };

  //   //   //   const launchRandomMajorGame = () => {
  //   //   //     socket.emit("launchRandomGame", { user, isMinor: false });
  //   //   //   };

  //   //   //   const buttons2 = [
  //   //   //     {
  //   //   //       className: "primary",
  //   //   //       text: "Малая игра",
  //   //   //       clickHandler: launchRandomMinorGame,
  //   //   //     },
  //   //   //     {
  //   //   //       className: "primary",
  //   //   //       text: "Большая игра",
  //   //   //       clickHandler: launchRandomMajorGame,
  //   //   //     },
  //   //   //   ];

  //   //   //   dispatch(
  //   //   //     setModal({
  //   //   //       isVisible: true,
  //   //   //       text: "Выберите тип игры",
  //   //   //       buttons2,
  //   //   //     })
  //   //   //   );
  //   //   // };

  //   //   // const launchPlayerChoice = () => {
  //   //   //   socket.emit("userLogin", user);
  //   //   //   history.push("/users");
  //   //   // };

  //   //   // const buttons = [
  //   //   //   {
  //   //   //     className: "primary",
  //   //   //     text: "Играть немедленно",
  //   //   //     clickHandler: launchRandomPlay,
  //   //   //   },
  //   //   //   {
  //   //   //     className: "primary",
  //   //   //     text: "Сначала выбрать игроков",
  //   //   //     clickHandler: launchPlayerChoice,
  //   //   //   },
  //   //   // ];

  //   //   // dispatch(
  //   //   //   setModal({
  //   //   //     isVisible: true,
  //   //   //     text: "Выберите дальнейшее действие",
  //   //   //     buttons,
  //   //   //   })
  //   //   // );
  //   // }
  // }, [userInfo, dispatch, history]);

  return (
    <div className="login">
      <h1>Вход</h1>
      {/* <p className="lead">Войдите в свою учетную запись</p> */}
      {error && <Message className="danger" text={error} />}
      {loading && <Loader />}
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите пароль..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Войти" />
      </form>
      <p>
        Нет учетной записи? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
