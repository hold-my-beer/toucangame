import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import socket from "./config/socket";
import "./App.css";
import Modal from "./components/Modal";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SelectGameScreen from "./screens/SelectGameScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UsersScreen from "./screens/UsersScreen";
import IslandScreen from "./screens/IslandScreen";
import ResultScreen from "./screens/ResultScreen";
import { logout } from "./actions/userActions";

const App = () => {
  const dispatch = useDispatch();

  const forceLogoutHandler = () => {
    // <Redirect to="/" />;

    dispatch(logout());
  };

  useEffect(() => {
    socket.on("forceLogout", forceLogoutHandler);

    return () => socket.off("forceLogout", forceLogoutHandler);
  });

  return (
    <>
      <div className="dark-overlay"></div>
      <Modal />
      <Header />

      <div className="container">
        <Switch>
          <Route path="/results" component={ResultScreen} exact />
          <Route path="/island" component={IslandScreen} exact />
          <Route path="/users" component={UsersScreen} exact />
          <Route path="/about" component={AboutScreen} exact />
          <Route path="/settings" component={SettingsScreen} exact />
          <Route path="/select-game" component={SelectGameScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={LandingScreen} exact />
        </Switch>
      </div>
    </>
  );
};

export default App;
