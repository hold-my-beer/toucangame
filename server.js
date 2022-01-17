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
  userLogin,
  userLogout,
  getUsers,
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
// const { setgroups } = require("process");

// User connects
io.on("connection", (socket) => {
  // Launch random game
  socket.on("launchRandomGame", ({ user, isMinor }) => {
    const socketRes = addRandomUser(socket.id, user);

    if (socketRes !== socket.id) {
      io.to(socketRes).emit("forceLogout");
    }

    // const sockets = await io.in(groupId).fetchSockets();

    // sockets.forEach((socket) => {
    //   socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);
    // });

    // const users = getUsers().filter((user) => user.groupId === groupId);

    // const game = initiateGame(users, isMinor);

    // const updatedGame = deal(game);

    // io.to(groupId).emit("getGame", updatedGame);
  });

  // User login
  socket.on("userLogin", (user) => {
    const socketRes = userLogin(socket.id, user);

    if (socketRes !== socket.id) {
      io.to(socketRes).emit("forceLogout");
    }

    socket.join(process.env.SOCKET_IO_PUBLIC_ROOM);

    io.to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

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
  socket.on("createGroup", () => {
    setLeader(socket.id);
    const groupId = uuidv4();
    setGroup(socket.id, groupId);

    socket.join(groupId);

    io.to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

  // User adds another user to group
  socket.on("addToGroup", async (socketId) => {
    // console.log([...socket.rooms]);
    const groupId = [...socket.rooms].find(
      (item, index) => index !== 0 && item !== "public"
    );
    setGroup(socketId, groupId);

    const sockets = await io.fetchSockets();
    const socketToAdd = sockets.find((socket) => socket.id === socketId);
    if (socketToAdd) {
      socketToAdd.join(groupId);
    }

    io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

  // User removes another user from group
  socket.on("removeFromGroup", async (socketId) => {
    const groupId = userLeaveGroup(socketId);
    const sockets = await io.in(groupId).fetchSockets();

    const socketToRemove = sockets.find((socket) => socket.id === socketId);

    if (socketToRemove) {
      socketToRemove.leave(groupId);
    }

    io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

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

    io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

  // Launch game
  socket.on("launchGame", async ({ groupId, isMinor }) => {
    const sockets = await io.in(groupId).fetchSockets();

    sockets.forEach((socket) => {
      socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);
    });

    const users = getUsers().filter((user) => user.groupId === groupId);

    const game = initiateGame(users, isMinor);

    const updatedGame = deal(game);

    // io.to(groupId).emit("getNewGame", updatedGame);
    io.to(groupId).emit("getGame", updatedGame);
  });

  // User updates turn
  socket.on("updateTurn", ({ groupId, gameId, turn }) => {
    const gameInfo = updateTurn(socket.id, gameId, turn);

    if (gameInfo.isNewGame) {
      const updatedGame = deal(gameInfo.game);

      io.to(groupId).emit("getUsers", {
        users: getUsers(),
        newStats: true,
      });

      io.to(groupId).emit("getNewRound", updatedGame);
    } else if (gameInfo.isNewRound) {
      const updatedGame = deal(gameInfo.game);

      io.to(groupId).emit("getNewRound", updatedGame);
    } else if (gameInfo.isNewTurn) {
      const updatedGame = deal(gameInfo.game);
      // console.log("getGame");
      io.to(groupId).emit("getGame", updatedGame);
    }
  });

  // User quit game
  socket.on("quitGame", (gameId) => {
    const groupId = userLeaveGroup(socket.id);

    socket.leave(groupId);

    socket.join(process.env.SOCKET_IO_PUBLIC_ROOM);

    io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });

    const game = quitGame(socket.id, gameId);
    io.to(groupId).emit("getGame", game);
  });

  // User logout
  socket.on("userLogout", () => {
    const groupId = userLeaveGroup(socket.id);

    socket.leave(groupId);

    socket.leave(process.env.SOCKET_IO_PUBLIC_ROOM);

    userLogout(socket.id);

    io.to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
      newStats: false,
    });
  });

  // User disconnect
  socket.on("disconnect", () => {
    const groupId = userLeaveGroup(socket.id);

    const user = userLogout(socket.id);
    // console.log(user);

    io.to(groupId).to(process.env.SOCKET_IO_PUBLIC_ROOM).emit("getUsers", {
      users: getUsers(),
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
