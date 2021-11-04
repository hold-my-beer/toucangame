import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UsersScreen from "./screens/UsersScreen";
import IslandScreen from "./screens/IslandScreen";
import ResultScreen from "./screens/ResultScreen";

const App = () => {
  return (
    // <Router>
    <>
      <Header />
      <Modal />
      <div className="container">
        {/* {loading ? (
            <Loader />
          ) : error ? (
            <Message className="danger" text={error} />
          ) : (
            <> */}
        <Switch>
          <Route path="/results" component={ResultScreen} exact />
          <Route path="/minor-island" component={IslandScreen} exact />
          <Route path="/users" component={UsersScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={LandingScreen} exact />
        </Switch>
        {/* </>
          )} */}
      </div>
    </>
    // </Router>
  );
};

export default App;
