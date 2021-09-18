const { v4: uuidv4 } = require("uuid");

let users = [];

const userLogin = (socketId, user) => {
  // console.log(socket);
  const userExists = users.find((item) => item.id === user.id);

  if (!userExists) {
    user.socketId = socketId;
    user.isLeader = false;
    user.groupId = "";
    users.unshift(user);
  }

  // console.log(users);
};

const userLogout = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = () => {
  return users;
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

module.exports = {
  userLogin,
  userLogout,
  getUsers,
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
};
