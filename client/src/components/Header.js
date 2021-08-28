import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Тропы Туканы</h1>
      </Link>
      <Link to="/login">Вход</Link>
    </nav>
  );
};

export default Header;
