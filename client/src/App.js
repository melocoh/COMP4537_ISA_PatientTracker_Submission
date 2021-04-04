import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import Stats from "./pages/Stats";
import "./App.css";

const App = () => {
  return (
    <>
      <Route exact path="/" component={Auth} />
      <Switch>
        <Route exact path="/4537/termproject/API/V1/admin" component={Stats} />
      </Switch>
    </>
  );
};

export default App;
