import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { io } from "socket.io-client";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MinorIslandScreen from "./screens/MinorIslandScreen";

const App = () => {
  const socket = io("http://127.0.0.1:5000");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  return (
    <Router>
      <>
        <Header />
        <div className="container">
          <Route path="/minor-island" component={MinorIslandScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={LandingScreen} exact />
        </div>
      </>
    </Router>
  );
};

export default App;
