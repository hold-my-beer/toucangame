import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import socket from "./config/socket";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UsersScreen from "./screens/UsersScreen";
import IslandScreen from "./screens/IslandScreen";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      const user = {
        id: userInfo.id,
        name: userInfo.name,
        friends: userInfo.friends,
        stats: userInfo.stats,
      };
      socket.emit("userLogin", user);
    }
  }, [userInfo]);

  return (
    <Router>
      <>
        <Header />
        <div className="container">
          <Route path="/minor-island" component={IslandScreen} exact />
          <Route path="/users" component={UsersScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={LandingScreen} exact />
        </div>
      </>
    </Router>
  );
};

export default App;
