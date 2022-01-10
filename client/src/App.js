import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UsersScreen from "./screens/UsersScreen";
import IslandScreen from "./screens/IslandScreen";
import ResultScreen from "./screens/ResultScreen";

const App = () => {
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
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={LandingScreen} exact />
        </Switch>
      </div>
    </>
  );
};

export default App;
