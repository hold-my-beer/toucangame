import React, { useState, useEffect } from "react";

const Opponent = ({ user }) => {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    if (width >= 100) return;

    const id = setTimeout(() => {
      setWidth(width + 1);
    }, 300);

    return () => clearTimeout(id);
  }, [width]);

  return (
    <div className="opponent">
      <div className="opponentData">
        <span className="mr-1">{user.name}</span>
        {/* <span>{user.points}</span> */}
      </div>
      <div className="opponentStatusContainer">
        <div
          className="opponentStatus"
          style={{ width: `${width + "%"}` }}
        ></div>
      </div>
    </div>
  );
};

export default Opponent;
