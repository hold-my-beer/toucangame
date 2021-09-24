import React from "react";
import Opponent from "./Opponent";

const Opponents = ({ users }) => {
  return (
    <div className="opponents">
      <h4 className="text-center mb-1">Соперники</h4>
      {users.map((user) => (
        <Opponent key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Opponents;
