import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import Loader from "../components/Loader";
import Message from "../components/Message";
import UserListItem from "../components/UserListItem";
import { listUsers } from "../actions/userActions";
import { getGame } from "../actions/gameActions";
import { setModal } from "../actions/modalActions";

const UsersScreen = ({ history }) => {
  // const [audioSource, setAudioSource] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingList, error: errorList, users } = userList;

  const getUsersHandler = ({ users, newStats }) => {
    // console.log(newStats);
    // if (newStats) {
    //   console.log("newStats");
    //   const userIndex = users.findIndex((user) => user.id === userInfo.id);

    //   if (userIndex !== -1) {
    //     const stats = users[userIndex].stats;

    //     dispatch(updateStats(stats));
    //   }
    // }

    dispatch(listUsers(users, userInfo.id));
  };

  // useEffect(() => {
  //   socket.on("getNewGame", (game) => {
  //     // console.log(game);
  //     dispatch(getGame(game, userInfo.id));
  //     // history.push("/minor-island");
  //   });

  //   return () => {
  //     socket.off("getNewGame", (game) => {
  //       dispatch(getGame(game, userInfo.id));
  //       // history.push("/minor-island");
  //     });
  //   };
  // }, [dispatch, history, userInfo.id]);

  // useEffect(() => {
  //   socket.on("getGame", (game) => {
  //     dispatch(getGame(game, userInfo.id));
  //     history.push("/minor-island");
  //   });

  //   return socket.off("getGame", (game) => {
  //     dispatch(getGame(game, userInfo.id));
  //     history.push("/minor-island");
  //   });
  // }, [dispatch, history, userInfo.id]);

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
    // socket.emit("launchGame", groupId);
    const launchMinorGame = () => {
      socket.emit("launchGame", { groupId, isMinor: true });
      // history.push("/island");
    };

    const launchMajorGame = () => {
      socket.emit("launchGame", { groupId, isMinor: false });
      // history.push("/island");
    };

    const buttons = [
      {
        className: "primary",
        text: "Малая игра",
        clickHandler: launchMinorGame,
      },
      {
        className: "primary",
        text: "Большая игра",
        clickHandler: launchMajorGame,
      },
    ];

    dispatch(
      setModal({
        isVisible: true,
        text: "Выберите тип игры",
        buttons,
      })
    );
  };

  const getGameHandler = (game) => {
    // console.log("game received");
    dispatch(getGame(game, userInfo.id));
    history.push("/island");
  };

  useEffect(() => {
    const usersBackgroundMusic = document.getElementById(
      "usersBackgroundMusic"
    );

    if (usersBackgroundMusic && userInfo) {
      // setAudioSource("audio/bensound-adventure.mp3");
      usersBackgroundMusic.volume =
        userInfo.settings &&
        userInfo.settings.musicVolume &&
        parseInt(userInfo.settings.musicVolume) / 100;
      // usersBackgroundMusic.play();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      socket.emit("userLogin", {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        stats: userInfo.stats,
      });
    } else {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    socket.on("getUsers", getUsersHandler);

    return () => socket.off("getUsers", getUsersHandler);
  });

  useEffect(() => {
    socket.on("getGame", getGameHandler);

    return () => socket.off("getGame", getGameHandler);
  });

  return (
    <div className="usersOnline">
      <audio
        id="usersBackgroundMusic"
        src="audio/bensound-adventure.mp3"
        // src={audioSource}
        autoPlay={true}
        loop={true}
      ></audio>
      <h1>Пользователи онлайн</h1>
      {loading || loadingList ? (
        <Loader />
      ) : error || errorList ? (
        <Message className="danger" text={error || errorList} />
      ) : (
        users &&
        users.groupUsers &&
        users.freeUsers && (
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
                    <UserListItem
                      key={user.id}
                      user={user}
                      isMe={user.id === userInfo.id}
                      isMeInGroup={true}
                      isMeLeader={users.groupUsers[0].isLeader}
                      meHandler={leaveGroupHandler}
                      notMeHandler={removeFromGroupHandler}
                      meButtonText="Выйти из группы"
                      notMeButtonText="Удалить из группы"
                    />
                  ))}
                  {users.groupUsers[0].isLeader && (
                    <button
                      type="button"
                      className="launchGame btn btn-success"
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

              {users.freeUsers.length ? (
                users.freeUsers.map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isMe={user.id === userInfo.id}
                    isMeInGroup={false}
                    isMeLeader={
                      users.groupUsers.length &&
                      users.groupUsers[0].groupId &&
                      users.groupUsers[0].isLeader
                    }
                    meHandler={null}
                    notMeHandler={addToGroupHandler}
                    meButtonText=""
                    notMeButtonText="Пригласить в группу"
                  />
                ))
              ) : (
                <p>Нет свободных пользователей</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UsersScreen;
