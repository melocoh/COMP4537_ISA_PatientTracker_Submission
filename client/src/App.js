import React from "react";
import { Route, Switch } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";
import Auth from "./pages/Auth";
import Stats from "./pages/Stats";
import Landing from "./pages/Landing";
import setAuthToken from "./utils/setAuthToken";
import PatientRegister from "./pages/PatientRegister";
import PatientInfo from "./pages/PatientInfo";
import NotFound from "./pages/NotFound";

const App = () => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  return (
    <>
      <Route exact path="/" component={Auth} />
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/register" component={PatientRegister} />
        <Route exact path="/patient/:id" component={PatientInfo} />
        <Route exact path="/4537/termproject/API/V1/admin" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
