const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const {
  addRandomUser,
  removeRandomUser,
  getRandomUsers,
  includeRandomUsers,
  clearRandomUsers,
  userLogin,
  userLogout,
  getUsers,
  getUsersByGroup,
  setLeader,
  // changeLeader,
  setGroup,
  userLeaveGroup,
  // askForFriendship,
  // getGroupUsers
  // createGroup,
  // addToGroup,
  // removeFromGroup,
  // leaveGroup,
} = require("./utils/users");
const { initiateGame, updateTurn, deal, quitGame } = require("./utils/game");
const { PLAYERS_MAX_NUMBER } = require("./data/gameConstants");

let minorId = "";
let majorId = "";

// User connects
io.on("connection", (socket) => {
  // console.log("connect");

  // User login
  socket.on("userLogin", (user) => {
    const socketRes = userLogin(socket.id, user);

    if (socketRes !== socket.id) {
      io.to(socketRes).emit("forceLogout");
    }
  });

  // Add random user
  socket.on("addRandomUser", ({ isMinor }) => {
    addRandomUser(socket.id, isMinor);

    let users = getRandomUsers(isMinor);

    const groupId = users[0].groupId;

    socket.join(groupId);

    io.to(groupId).emit("getUsers", {
      users,
      newStats: false,
    });

    if (users.length === 1) {
      if (isMinor) {
        minorId = setTimeout(() => {
          users = getRandomUsers(isMinor);

          clearRandomUsers(isMinor);

          const game = initiateGame(users, isMinor);

          // const updatedGame = deal(game);

          // io.to(groupId).emit("getGame", updatedGame);
          io.to(groupId).emit("getGame", game);
        }, 10000);
      } else {
        majorId = setTimeout(() => {
          users = getRandomUsers(isMinor);
          clearRandomUsers(isMinor);

          const game = initiateGame(users, isMinor);

          // const updatedGame = deal(game);

          // io.to(groupId).emit("getGame", updatedGame);
          io.to(groupId).emit("getGame", game);
        }, 10000);
      }
    } else if (users.length === PLAYERS_MAX_NUMBER) {
      if (isMinor) {
        clearTimeout(minorId);
      } else {
        clearTimeout(majorId);
      }

      clearRandomUsers(isMinor);

      const game = initiateGame(users, isMinor);

      // const updatedGame = deal(game);

      // io.to(groupId).emit("getGame", updatedGame);
      io.to(groupId).emit("getGame", game);
    }
  });

  // Launch another random user game
  socket.on("launchRandomUserGame", async ({ users, isMinor }) => {
    const groupId = users[0].groupId;

    if (users.length === PLAYERS_MAX_NUMBER) {
      const game = initiateGame(users, isMinor);

      // const updatedGame = deal(game);

      // io.to(groupId).emit("getGame", updatedGame);
      io.to(groupId).emit("getGame", game);
    } else {
      let updatedUsers = includeRandomUsers(users, isMinor);

      // Earlier added random users leave old room and join new room
      const otherGroupUsers = updatedUsers.filter(
        (user) => user.groupId !== groupId
      );

      if (otherGroupUsers.length) {
        const otherGroupId = otherGroupUsers[0].groupId;

        const sockets = await io.in(otherGroupId).fetchSockets();

        sockets.forEach((socket) => {
          socket.leave(otherGroupId);

          socket.join(groupId);
        });
      }

      if (updatedUsers.length === PLAYERS_MAX_NUMBER) {
        const remainingRandomUsers = getRandomUsers(isMinor);

        if (!remainingRandomUsers.length) {
          if (isMinor) {
            clearTimeout(minorId);
          } else {
            clearTimeout(majorId);
          }
        }

        const game = initiateGame(updatedUsers, isMinor);

        // const updatedGame = deal(game);

        // io.to(groupId).emit("getGame", updatedGame);
        io.to(groupId).emit("getGame", game);
      } else if (updatedUsers.length === users.length) {
        // console.log("in final branch");
        if (isMinor) {
          minorId = setTimeout(() => {
            updatedUsers = getRandomUsers(isMinor);

            clearRandomUsers(isMinor);

            const game = initiateGame(updatedUsers, isMinor);

            // const updatedGame = deal(game);

            // io.to(groupId).emit("getGame", updatedGame);
            io.to(groupId).emit("getGame", game);
          }, 10000);
        } else {
          majorId = setTimeout(() => {
            updatedUsers = getRandomUsers(isMinor);

            clearRandomUsers(isMinor);

            const game = initiateGame(updatedUsers, isMinor);

            // const updatedGame = deal(game);

            // io.to(groupId).emit("getGame", updatedGame);
            io.to(groupId).emit("getGame", game);
          }, 10000);
        }
      }
    }
  });

  // Add public user
  // socket.on("addPublicUser", (group = "") => {
  //   if (!group) {
  //     setGroup(socket.id, process.env.SOCKET_IO_PUBLIC_ROOM);

  //     socket.join(process.env.SOCKET_IO_PUBLIC_ROOM);
  //   }

  //   const groupId = group || process.env.SOCKET_IO_PUBLIC_ROOM;

  //   // const users = getUsersByGroup(groupId);
  //   // console.log(users);

  //   io.to(groupId).emit("getUsers", {
  //     users: getUsersByGroup(groupId),
  //     // users,
  //     newStats: false,
  //   });
  // });

  // User asks another user for friendship
  // socket.on("askForFriendship", (socketId) => {
  //   askForFriendship(socket.id, socketId);

  //   // To current socket (initiator)
  //   socket.emit("getUsers", {
  //     users: getUsers(),
  //   });

  //   // To other socket (acceptor)
  //   io.to(socketId).emit("getUsers", {
  //     users: getUsers(),
  //   });
  // });

  // User creates group
  // socket.on("createGroup", () => {
  //   setLeader(socket.id);
  //   const groupId = uuidv4();
  //   setGroup(socket.id, groupId);

  //   socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);
  //   socket.join(groupId);

  //   io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
  //     users: getUsers(),
  //     newStats: false,
  //   });
  // });

  // User adds another user to group
  // socket.on("addToGroup", async (socketId) => {
  //   // console.log([...socket.rooms]);
  //   const groupId = [...socket.rooms].find(
  //     (item, index) => index !== 0 && item !== process.env.SOCKET_IO_PUBLIC_ROOM
  //   );
  //   setGroup(socketId, groupId);

  //   const sockets = await io.fetchSockets();
  //   const socketToAdd = sockets.find((socket) => socket.id === socketId);
  //   if (socketToAdd) {
  //     socketToAdd.join(groupId);
  //   }

  //   io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
  //     users: getUsers(),
  //     newStats: false,
  //   });
  // });

  // User removes another user from group
  // socket.on("removeFromGroup", async (socketId) => {
  //   const groupId = userLeaveGroup(socketId);
  //   const sockets = await io.in(groupId).fetchSockets();

  //   const socketToRemove = sockets.find((socket) => socket.id === socketId);

  //   if (socketToRemove) {
  //     socketToRemove.leave(groupId);
  //   }

  //   io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
  //     users: getUsers(),
  //     newStats: false,
  //   });
  // });

  // User receives request to leave group
  // socket.on("leaveRoom", (socketId) => {
  //   console.log("in leave room");

  //   if (socket.id === socketId) {
  //     const groupId = [...socket.rooms][1];
  //     userLeaveGroup(socket.id, groupId);

  //     socket.leave(groupId);

  //     io.emit("getUsers", {
  //       users: getUsers(),
  //     });
  //   }
  // });

  // User leaves group by himself
  socket.on("leaveGroup", () => {
    const groupId = userLeaveGroup(socket.id);

    socket.leave(groupId);

    io.to(groupId)
      // .to(process.env.SOCKET_IO_PUBLIC_ROOM)
      .emit("getUsers", {
        users: getUsersByGroup(groupId),
        newStats: false,
      });
  });

  // Launch game
  // socket.on("launchGame", async ({ groupId, isMinor }) => {
  //   const sockets = await io.in(groupId).fetchSockets();

  //   sockets.forEach((socket) => {
  //     socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);
  //   });

  //   const users = getUsers().filter((user) => user.groupId === groupId);

  //   const game = initiateGame(users, isMinor);

  //   const updatedGame = deal(game);

  //   // io.to(groupId).emit("getNewGame", updatedGame);
  //   io.to(groupId).emit("getGame", updatedGame);
  // });

  // User updates turn
  socket.on("updateTurn", ({ groupId, gameId, turn }) => {
    const gameInfo = updateTurn(socket.id, gameId, turn);

    if (gameInfo.isNewGame) {
      const updatedGame = deal(gameInfo.game);

      io.to(groupId).emit("getUsers", {
        // users: getUsers(),
        users: getUsersByGroup(groupId),
        newStats: true,
      });

      io.to(groupId).emit("getNewRound", updatedGame);
    } else if (gameInfo.isNewRound) {
      const updatedGame = deal(gameInfo.game);

      io.to(groupId).emit("getNewRound", updatedGame);
    } else if (gameInfo.isNewTurn) {
      const updatedGame = deal(gameInfo.game);
      // console.log("new turn");
      // console.log(updatedGame.deal);
      io.to(groupId).emit("getGame", updatedGame);
    } else {
      // console.log("is waiting");
      // console.log(gameInfo.game.deal);
      io.to(groupId).emit("getUpdatedTurn", gameInfo.game);
    }
  });

  // User quit game
  socket.on("quitGame", (gameId) => {
    const groupId = userLeaveGroup(socket.id);

    socket.leave(groupId);

    // socket.join(process.env.SOCKET_IO_PUBLIC_ROOM);

    io.to(groupId)
      // .to(process.env.SOCKET_IO_PUBLIC_ROOM)
      .emit("getUsers", {
        // users: getUsers(),
        users: getUsersByGroup(groupId),
        newStats: false,
      });

    const game = quitGame(socket.id, gameId);
    io.to(groupId).emit("getGame", game);
  });

  // User logout
  socket.on("userLogout", () => {
    const groupId = userLeaveGroup(socket.id);

    socket.leave(groupId);

    // socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);

    userLogout(socket.id);

    io
      // .to(process.env.SOCKET_IO_PUBLIC_ROOM)
      .to(groupId)
      .emit("getUsers", {
        // users: getUsers(),
        users: getUsersByGroup(groupId),
        newStats: false,
      });
  });

  // User disconnect
  socket.on("disconnect", () => {
    const groupId = userLeaveGroup(socket.id);

    const user = userLogout(socket.id);
    // console.log(user);

    io.to(groupId)
      // .to(process.env.SOCKET_IO_PUBLIC_ROOM)
      .emit("getUsers", {
        // users: getUsers(),
        users: getUsersByGroup(groupId),
        newStats: false,
      });

    if (user && user.gameId) {
      const game = quitGame(socket.id, user.gameId);
      io.to(groupId).emit("getGame", game);
    }
  });
});

app.use(express.json());

app.use("/api/users", userRoutes);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
