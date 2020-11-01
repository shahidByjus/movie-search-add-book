import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import Detail from "./components/Detail";
import AddMovie from "./components/AddMovie";

const history = createBrowserHistory();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/detail/:movieId">
          <Detail />
        </Route>
        <Route path="/addMovie">
          <AddMovie />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);
