// import { io } from "socket.io-client";
const { io } = require("socket.io-client");

// const socket = io("http://127.0.0.1:5000");
const socket = io("https://toucangame.herokuapp.com/");

// export default socket;
module.exports = socket;
