import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Background from "./Background/Background";
import GlobalStyles from "../GlobalStyles";

const App = () => {
  return (
    <Router>
      <Background>
        <Switch>
          <Route exact path="/">
            sign in
          </Route>
          <Route path="/lobby/:roomId">lobby</Route>
          <Route path="/gameroom/:roomId">gameroom</Route>
        </Switch>
        <GlobalStyles />
      </Background>
    </Router>
  );
};

export default App;
