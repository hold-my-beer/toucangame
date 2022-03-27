import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage("Пароли не совпадают");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      {/* <p className="lead">
        Зарегистрируйтесь, чтобы сохранять достижения и играть с друзьями
      </p> */}
      {message && <Message className="danger" text={message} />}
      {error && <Message className="danger" text={error} />}
      {loading && <Loader />}
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Имя*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите имя (видно игрокам)..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль*</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите пароль..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Повторите пароль*</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Введите пароль повторно..."
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <p className="mb-1">
          <small>* - поля обязательны для заполнения</small>
        </p>
        <input
          type="submit"
          className="btn btn-primary"
          value="Зарегистрироваться"
        />
      </form>
      <p>
        Есть учетная запись? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
