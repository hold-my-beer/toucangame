import React from "react";

const UserListItem = ({
  user,
  isMe,
  isMeInGroup,
  isMeLeader,
  meHandler,
  notMeHandler,
  meButtonText,
  notMeButtonText,
}) => {
  return (
    <div className="userListItem">
      <div className="userListItemData">
        <div className="username">
          {user.name} {user.isLeader && <i className="fas fa-flag"></i>}
        </div>{" "}
        <div className="userStats">
          <i className="fas fa-trophy"></i> {user.stats.total.wins}{" "}
          <i className="fas fa-star"></i> {user.stats.total.points}{" "}
        </div>
      </div>
      <div className="userListItemButtons">
        {isMe && isMeInGroup ? (
          <button
            type="button"
            className="btn btn-danger btn-border-light"
            onClick={meHandler}
          >
            {meButtonText}
          </button>
        ) : isMeLeader ? (
          <button
            type="button"
            className="btn btn-danger btn-border-light"
            onClick={(e) => notMeHandler(user.socketId)}
          >
            {notMeButtonText}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserListItem;
