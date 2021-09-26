import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers } from "../actions/userActions";
import { getGame } from "../actions/gameActions";

const UsersScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingList, error: errorList, users } = userList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    socket.on("getUsers", ({ users }) => {
      dispatch(listUsers(users, userInfo.id));
    });

    return socket.off("getUsers", ({ users }) => {
      dispatch(listUsers(users, userInfo.id));
    });
  }, [dispatch, userInfo.id]);

  useEffect(() => {
    socket.on("getGame", (game) => {
      dispatch(getGame(game, userInfo.id));
      history.push("/minor-island");
    });

    return socket.off("getGame", (game) => {
      dispatch(getGame(game, userInfo.id));
      history.push("/minor-island");
    });
  }, [dispatch, history, userInfo.id]);

  // const askForFriendshipHandler = (socketId) => {
  //   socket.emit("askForFriendship", socketId);
  // };

  const createGroupHandler = () => {
    socket.emit("createGroup");
  };

  const leaveGroupHandler = () => {
    socket.emit("leaveGroup");
  };

  const addToGroupHandler = (socketId) => {
    socket.emit("addToGroup", socketId);
  };

  const removeFromGroupHandler = (socketId) => {
    socket.emit("removeFromGroup", socketId);
  };

  const launchGameHandler = (groupId) => {
    socket.emit("launchGame", groupId);
  };

  return (
    <div className="usersOnline">
      <h1 className="large">Пользователи онлайн</h1>
      {loading || loadingList ? (
        <Loader />
      ) : error || errorList ? (
        <Message className="danger" text={error || errorList} />
      ) : (
        users && (
          // users.length !== 0 &&
          <div className="userLists">
            <div className="userList">
              <h3 className="mb-1">Ваша группа</h3>
              {!users.groupUsers || users.groupUsers.length === 0 ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={createGroupHandler}
                >
                  Создать группу
                </button>
              ) : (
                <>
                  {users.groupUsers.map((user) => (
                    <div key={user.id} className="userListItem">
                      <div className="userListItemData">
                        <div className="username">
                          {user.name}{" "}
                          {user.isLeader && <i className="fas fa-flag"></i>}
                        </div>{" "}
                        <div className="userStats">
                          <i className="fas fa-trophy"></i>{" "}
                          {user.stats.total.wins}{" "}
                          <i className="fas fa-star"></i>{" "}
                          {user.stats.total.points}{" "}
                        </div>
                      </div>
                      {user.id === userInfo.id && (
                        <div className="userListItemButtons">
                          <button
                            type="button"
                            className="btn btn-danger btn-border-light"
                            onClick={leaveGroupHandler}
                          >
                            Выйти из группы
                          </button>
                        </div>
                      )}
                      {user.id !== userInfo.id && (
                        <div className="userListItemButtons">
                          {users.groupUsers[0].isLeader && (
                            <button
                              type="button"
                              className="btn btn-danger btn-border-light"
                              onClick={(e) =>
                                removeFromGroupHandler(user.socketId)
                              }
                            >
                              Удалить из группы
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <Link to="/minor-island" className="btn btn-success my-1">
                    Начать игру
                  </Link> */}
                  {users.groupUsers[0].isLeader && (
                    <button
                      type="button"
                      className="btn btn-success my-1"
                      onClick={(e) =>
                        launchGameHandler(users.groupUsers[0].groupId)
                      }
                    >
                      Начать игру
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="userList">
              <h3 className="mb-1">Свободные пользователи</h3>

              {users.freeUsers &&
                users.freeUsers.map((user) => (
                  <div key={user.id} className="userListItem">
                    <div className="userListItemData">
                      <div className="username">{user.name}</div>
                      <div className="userStats">
                        <i className="fas fa-trophy"></i>{" "}
                        {user.stats.total.wins} <i className="fas fa-star"></i>{" "}
                        {user.stats.total.points}{" "}
                      </div>
                    </div>
                    {user.id !== userInfo.id && (
                      <div className="userListItemButtons">
                        {users.groupUsers.length &&
                          users.groupUsers[0].groupId &&
                          users.groupUsers[0].isLeader && (
                            <button
                              type="button"
                              className="btn btn-success btn-border-light"
                              onClick={(e) => addToGroupHandler(user.socketId)}
                            >
                              Пригласить в группу
                            </button>
                          )}
                        {/* <button
                        type="button"
                        className="btn btn-primary btn-border-light"
                        onClick={(e) => askForFriendshipHandler(user.socketId)}
                      >
                        Дружить
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-border-light"
                        // onClick={removeFromFriendsHandler}
                      >
                        Удалить из друзей
                      </button> */}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UsersScreen;
