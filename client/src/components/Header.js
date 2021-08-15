import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <h1>Тропы Туканы</h1>
      <Link to="/login">Войти</Link>
    </nav>
  );
};

export default Header;
