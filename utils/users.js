const { v4: uuidv4 } = require("uuid");
const { PLAYERS_MAX_NUMBER } = require("../data/gameConstants");

let users = [];
let minorRandomUsers = [];
let majorRandomUsers = [];
let minorGroupId = "";
let majorGroupId = "";

const checkUserExists = (userId) => {
  let socket = "";

  // const minorRandomUserExists = minorRandomUsers.find(
  //   (item) => item.id === userId
  // );

  // if (minorRandomUserExists) {
  //   socket = minorRandomUserExists.socketId;
  //   removeRandomUser(socket, true);
  //   return socket;
  // }

  // const majorRandomUserExists = majorRandomUsers.find(
  //   (item) => item.id === userId
  // );

  // if (majorRandomUserExists) {
  //   socket = majorRandomUserExists.socketId;
  //   removeRandomUser(socket, false);
  //   return socket;
  // }

  const userExists = users.find((item) => item.id === userId);

  if (userExists) {
    socket = userExists.socketId;
    userLogout(socket);
    // return socket;
  }

  return socket;
};

const userLogin = (socketId, user) => {
  let socket = checkUserExists(user.id);

  if (!socket) {
    socket = socketId;
  }

  user.socketId = socketId;
  user.isLeader = false;
  user.groupId = "";
  users.unshift(user);

  return socket;
};

const userLogout = (socketId) => {
  const minorIndex = minorRandomUsers.findIndex(
    (user) => user.socketId === socketId
  );
  if (minorIndex !== -1) {
    minorRandomUsers.splice(minorIndex, 1)[0];
  }

  const majorIndex = majorRandomUsers.findIndex(
    (user) => user.socketId === socketId
  );
  if (majorIndex !== -1) {
    majorRandomUsers.splice(majorIndex, 1)[0];
  }

  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const addRandomUser = (socketId, isMinor) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  if (index !== -1) {
    users[index].status = "isRandomSeeking";

    if (isMinor) {
      if (!minorGroupId) {
        minorGroupId = uuidv4();
        users[index].isLeader = true;
      }
      users[index].groupId = minorGroupId;
      minorRandomUsers.unshift(users[index]);
    } else {
      if (!majorGroupId) {
        majorGroupId = uuidv4();
        users[index].isLeader = true;
      }
      users[index].groupId = majorGroupId;
      majorRandomUsers.unshift(users[index]);
    }
  }

  // return socket;
};

const includeRandomUsers = (groupUsers, isMinor) => {
  const groupId = groupUsers[0].groupId;

  if (isMinor) {
    if (minorRandomUsers.length + groupUsers.length < PLAYERS_MAX_NUMBER) {
      minorGroupId = groupId;
      minorRandomUsers.forEach((user) => {
        user.groupId = groupId;
        user.isLeader = false;
      });

      minorRandomUsers = [...minorRandomUsers, ...groupUsers];

      return minorRandomUsers;
    } else if (
      minorRandomUsers.length + groupUsers.length ==
      PLAYERS_MAX_NUMBER
    ) {
      minorRandomUsers.forEach((user) => {
        user.groupId = groupId;
        user.isLeader = false;
      });

      const updatedUsers = [...minorRandomUsers, ...groupUsers];

      clearRandomUsers(isMinor);

      return updatedUsers;
    } else {
      let updatedUsers = [...groupUsers];
      let usersNeeded = PLAYERS_MAX_NUMBER - groupUsers.length;

      for (let i = 0; i < minorRandomUsers.length; i++) {
        if (!minorRandomUsers[i].isLeader) {
          minorRandomUsers[i].groupId = groupId;
          updatedUsers.push(minorRandomUsers[i]);
          minorRandomUsers = minorRandomUsers.splice(index, 1);
          usersNeeded--;
        }

        if (!usersNeeded) {
          break;
        }
      }

      return updatedUsers;
    }
  } else {
    if (majorRandomUsers.length + groupUsers.length < PLAYERS_MAX_NUMBER) {
      majorGroupId = groupId;
      majorRandomUsers.forEach((user) => {
        user.groupId = groupId;
        user.isLeader = false;
      });

      majorRandomUsers = [...majorRandomUsers, ...groupUsers];

      return majorRandomUsers;
    } else if (
      majorRandomUsers.length + groupUsers.length ==
      PLAYERS_MAX_NUMBER
    ) {
      majorRandomUsers.forEach((user) => {
        user.groupId = groupId;
        user.isLeader = false;
      });

      const updatedUsers = [...majorRandomUsers, ...groupUsers];

      clearRandomUsers(isMinor);

      return updatedUsers;
    } else {
      let updatedUsers = [...groupUsers];
      let usersNeeded = PLAYERS_MAX_NUMBER - groupUsers.length;

      for (let i = 0; i < majorRandomUsers.length; i++) {
        if (!majorRandomUsers[i].isLeader) {
          majorRandomUsers[i].groupId = groupId;
          updatedUsers.push(majorRandomUsers[i]);
          majorRandomUsers = majorRandomUsers.splice(index, 1);
          usersNeeded--;
        }

        if (!usersNeeded) {
          break;
        }
      }

      return updatedUsers;
    }
  }
};

const removeRandomUser = (socketId, isMinor) => {
  if (isMinor) {
    const index = minorRandomUsers.findIndex(
      (user) => user.socketId === socketId
    );
    if (index !== -1) {
      return minorRandomUsers.splice(index, 1)[0];
    }
  } else {
    const index = majorRandomUsers.findIndex(
      (user) => user.socketId === socketId
    );
    if (index !== -1) {
      return majorRandomUsers.splice(index, 1)[0];
    }
  }
};

const getRandomUsers = (isMinor) => {
  if (isMinor) {
    return minorRandomUsers;
  } else {
    return majorRandomUsers;
  }
};

const clearRandomUsers = (isMinor) => {
  if (isMinor) {
    minorRandomUsers = [];
    minorGroupId = "";
  } else {
    majorRandomUsers = [];
    majorGroupId = "";
  }
};

const getUsers = () => {
  return users;
};

const getUsersByGroup = (groupId) => {
  return users.filter((user) => user.groupId === groupId);
};

// const askForFriendship = (initiator, acceptor) => {
//   const initiatorIndex = users.findIndex((user) => user.socketId === initiator);
//   const acceptorIndex = users.findIndex((user) => user.socketId === acceptor);

//   if (initiatorIndex !== -1 && acceptorIndex !== -1) {
//     const initiatorFriendIndex = users[initiatorIndex].friends.findIndex(
//       (friend) => friend.socketId === acceptor
//     );

//     if (initiatorFriendIndex === -1) {
//       users[initiatorIndex].friends.push({
//         socketId: acceptor,
//         status: "toBeApproved",
//       });
//     } else {
//       users[initiatorIndex].friends[initiatorFriendIndex].status =
//         "toBeApproved";
//     }

//     const acceptorFriendIndex = users[acceptorIndex].friends.findIndex(
//       (friend) => friend.socketId === initiator
//     );

//     if (acceptorFriendIndex === -1) {
//       users[acceptorIndex].friends.push({
//         socketId: initiator,
//         status: "toApprove",
//       });
//     } else {
//       users[acceptorIndex].friends[acceptorFriendIndex].status = "toApprove";
//     }
//   }
// };

// const createGroup = (userId) => {
//   const index = users.findIndex((user) => user.id === userId);

//   if (index !== -1) {
//     users[index].isLeader = true;
//     users[index].groupId = uuidv4();
//   }
// };

// const addToGroup = (userId, groupId) => {
//   const index = users.findIndex((user) => user.id === userId);

//   if (index !== -1) {
//     users[index].groupId = groupId;
//   }
// };

// const removeFromGroup = (userId) => {
//   const index = users.findIndex((user) => user.id === userId);

//   if (index !== -1) {
//     users[index].groupId = "";
//   }
// };

// const leaveGroup = (userId) => {
//   const index = users.findIndex((user) => user.id === userId);

//   const groupId = users[index].groupId;
//   users[index].groupId = "";

//   if (users[index].isLeader === true) {
//     users[index].isLeader = false;
//     const nextIndex = users.findIndex((user) => user.groupId === groupId);

//     if (nextIndex !== -1) {
//       users[nextIndex].isLeader === true;
//     }
//   }
// };

const setLeader = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  // console.log(index);

  if (index !== -1) {
    users[index].isLeader = true;
  }
};

const setGroup = (socketId, groupId) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  if (index !== -1) {
    users[index].groupId = groupId;
  }
};

// const changeLeader = (socketId, groupId) => {
//   const index = users.findIndex((user) => user.socketId === socketId);

//   if (index !== -1 && users[index].isLeader === true) {
//     users[index].isLeader = false;

//     const newIndex = users.findIndex(
//       (user) => user.groupId === groupId && user.socketId !== socketId
//     );

//     if (newIndex !== -1) {
//       users[newIndex].isLeader = true;
//     }
//   }
// };

const userLeaveGroup = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  let groupId = "";

  if (index !== -1) {
    groupId = users[index].groupId;
    // console.log(groupId);
    users[index].groupId = "";

    if (users[index].isLeader === true) {
      users[index].isLeader = false;

      const newIndex = users.findIndex(
        (user) => user.groupId === groupId && user.socketId !== socketId
      );

      if (newIndex !== -1) {
        users[newIndex].isLeader = true;
      }
    }
  }

  return groupId;
};

// const getGroupUsers = (groupId) => {
//   return users.filter((user) => user.group === groupId);
// };

// const getFreeUsers = () => {
//   return users.filter((user) => user.group === "");
// };

const updateStats = (players, isMinor) => {
  if (players.length) {
    let maxPoints = 0;
    let winnerIDs = [];
    players.forEach((player) => {
      if (parseInt(player.totalPoints) > maxPoints) {
        maxPoints = parseInt(player.totalPoints);
        winnerIDs = [player.id];
      } else if (parseInt(player.totalPoints) === maxPoints) {
        winnerIDs.push(player.id);
      }
    });

    // for (const player of players) {
    players.forEach((player) => {
      // let user = await User.findById(player.id);
      const userIndex = users.findIndex((user) => user.id === player.id);
      let user = users[userIndex];

      const gamesPlayed = 1;
      const wins = winnerIDs.indexOf(player.id) !== 1 ? 1 : 0;
      const points = player.totalPoints;

      if (user) {
        stats = {
          total: {
            gamesPlayed: user.stats.total.gamesPlayed + gamesPlayed,
            wins: user.stats.total.wins + wins,
            points: user.stats.total.points + points,
          },
          minor: {
            gamesPlayed: isMinor
              ? user.stats.minor.gamesPlayed + gamesPlayed
              : user.stats.minor.gamesPlayed,
            wins: isMinor
              ? user.stats.minor.wins + wins
              : user.stats.minor.wins,
            points: isMinor
              ? user.stats.minor.points + points
              : user.stats.minor.points,
          },
          major: {
            gamesPlayed: !isMinor
              ? user.stats.major.gamesPlayed + gamesPlayed
              : user.stats.major.gamesPlayed,
            wins: !isMinor
              ? user.stats.major.wins + wins
              : user.stats.major.wins,
            points: !isMinor
              ? user.stats.major.points + points
              : user.stats.major.points,
          },
        };

        user.stats = stats;
        users[userIndex] = user;
      }
    });

    // return { message: "Данные сохранены" };
  }
};

module.exports = {
  addRandomUser,
  removeRandomUser,
  getRandomUsers,
  includeRandomUsers,
  clearRandomUsers,
  userLogin,
  userLogout,
  getUsers,
  getUsersByGroup,
  // askForFriendship,
  setLeader,
  // changeLeader,
  setGroup,
  userLeaveGroup,
  // getGroupUsers,
  // getFreeUsers,
  // createGroup,
  // addToGroup,
  // removeFromGroup,
  // leaveGroup,
  updateStats,
};
