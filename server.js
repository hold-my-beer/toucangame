const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
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

const { initiateGame, deal } = require("./utils/game");

io.on("connection", (socket) => {
  // console.log("a user connected");
  // let game = initiateGame(socket);
  // game = deal(game);
  // console.log(game);
});

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
