import React from "react";

const AboutScreen = () => {
  return (
    <div className="about">
      <h1 className="mb-1">О программе</h1>
      <div className="aboutGroup">
        <div className="aboutLabel">Разработчик</div>
        <div className="aboutData">Сергей Петров</div>
      </div>
      <div className="aboutGroup">
        <div className="aboutLabel">Музыка</div>
        <div className="aboutData">www.bensound.com</div>
      </div>
    </div>
  );
};

export default AboutScreen;
