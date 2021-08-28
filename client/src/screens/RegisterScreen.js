import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <h1 className="large">Регистрация</h1>
      <p className="lead">
        Зарегистрируйтесь, чтобы сохранять достижения и играть с друзьями
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите имя (будет видно всем)..."
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
