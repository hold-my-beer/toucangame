import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/users");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login">
      <h1 className="large">Войти</h1>
      <p className="lead">Войдите в свою учетную запись</p>
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
