import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Background from "./Background/Background";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import HostHandler from "./SignIn/HostHandler";
import LobbyWrapper from "./Lobby/LobbyWrapper";
import GameRoomWrapper from "./GameRoom/GameRoomWrapper";
import GlobalStyles from "../GlobalStyles";

const App = () => {
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
            <LobbyWrapper />
          </Route>
          <Route path="/gameroom/:roomId">
            <GameRoomWrapper />
          </Route>
        </Switch>
        <GlobalStyles />
      </Background>
    </Router>
  );
};

export default App;
