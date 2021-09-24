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
const { initiateGame, deal } = require("./utils/game");
const { setgroups } = require("process");

// User connects
io.on("connection", (socket) => {
  // User login
  socket.on("userLogin", (user) => {
    // user.socket = socket;
    // console.log("before userLogin");
    userLogin(socket.id, user);
    // console.log("after userLogin");

    // console.log(getUsers());

    io.emit("getUsers", {
      users: getUsers(),
    });
    // console.log("after emit");
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
    // console.log("in create group");
    setLeader(socket.id);
    const groupId = uuidv4();
    setGroup(socket.id, groupId);

    socket.join(groupId);

    io.emit("getUsers", {
      users: getUsers(),
    });
  });

  // User adds another user to group
  socket.on("addToGroup", async (socketId) => {
    const groupId = [...socket.rooms][1];
    // console.log(groupId);
    setGroup(socketId, groupId);

    // otherSocket.join(groupId);
    const sockets = await io.fetchSockets();
    const socketToAdd = sockets.find((socket) => socket.id === socketId);
    if (socketToAdd) {
      socketToAdd.join(groupId);
    }

    // socket.to(socketId).emit("joinRoom", groupId);

    io.emit("getUsers", {
      users: getUsers(),
    });
  });

  // User receives invitation to group
  // socket.on("joinRoom", (groupId) => {
  //   console.log("in joinRoom");

  //   socket.join(groupId);

  //   // io.emit("getUsers", {
  //   //   users: getUsers(),
  //   // });
  // });

  // User removes another user from group
  socket.on("removeFromGroup", async (socketId) => {
    // console.log("in remove from group");
    // const groupId = [...socket.rooms][1];
    const groupId = userLeaveGroup(socketId);
    // io.to(groupId).emit("leaveRoom", socketId);
    // otherSocket.leave(groupId);
    const sockets = await io.in(groupId).fetchSockets();

    const socketToRemove = sockets.find((socket) => socket.id === socketId);

    if (socketToRemove) {
      socketToRemove.leave(groupId);
    }

    io.emit("getUsers", {
      users: getUsers(),
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
    // const groupId = [...socket.rooms][1];
    const groupId = userLeaveGroup(socket.id);
    // changeLeader(socket.id, groupId);

    socket.leave(groupId);

    // if (user.isLeader && user.isLeader === true) {
    //   user.isLeader = false;

    //   const sockets = await io.in(groupId).fetchSockets();
    //   if (sockets.length !== 0) {
    //     setLeader(sockets[0].id);
    //   }
    // }

    io.emit("getUsers", {
      users: getUsers(),
    });
  });

  // Launch game
  socket.on("launchGame", (groupId) => {
    const users = getUsers().filter((user) => user.groupId === groupId);

    const game = initiateGame(users);

    const updatedGame = deal(game);

    io.to(groupId).emit("getGame", updatedGame);
  });

  // User logout
  socket.on("userLogout", () => {
    // const groupId = [...socket.rooms][1];
    // console.log(groupId);
    const groupId = userLeaveGroup(socket.id);
    // changeLeader(socket.id, groupId);

    socket.leave(groupId);

    userLogout(socket.id);

    io.emit("getUsers", {
      users: getUsers(),
    });
  });

  // User disconnect
  socket.on("disconnect", () => {
    // const groupId = [...socket.rooms][1];
    // console.log(groupId);
    userLeaveGroup(socket.id);
    // changeLeader(socket.id, groupId);

    // socket.leave(groupId);

    userLogout(socket.id);

    socket.broadcast.emit("getUsers", {
      users: getUsers(),
    });
  });
});

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
