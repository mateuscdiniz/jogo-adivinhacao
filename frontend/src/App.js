import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./componentes/Home";
import Ranking from "./componentes/Ranking";
import NaoEncontrada from "./componentes/NaoEncontrada";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/ranking" exact={true}>
          <Ranking />
        </Route>
        <Route path="*">
          <NaoEncontrada />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
