import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Background from "./Background/Background";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import HostHandler from "./SignIn/HostHandler";
import GlobalStyles from "../GlobalStyles";
import { CurrentUserContext } from "../CurrentUserContext";

const App = () => {
  const { currentUser } = React.useContext(CurrentUserContext);
  return (
    <Router>
      <Background>
        <Header />
        <Switch>
          <Route exact path="/">
            <SignIn
              buttonHandler={HostHandler}
              buttonMessage="Create Private Room"
            />
          </Route>
          <Route path="/lobby/:roomId">
            {currentUser ? (
              <div>Lobby</div>
            ) : (
              <SignIn
                buttonHandler={console.log("dog")}
                buttonMessage="Join your friends game !"
              />
            )}
          </Route>
          <Route path="/gameroom/:roomId">gameroom</Route>
        </Switch>
        <GlobalStyles />
      </Background>
    </Router>
  );
};

export default App;
