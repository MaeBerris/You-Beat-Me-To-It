import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Background from "./Background/Background";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import HostHandler from "./SignIn/HostHandler";
import LobbyWrapper from "./Lobby/LobbyWrapper";
import GameRoomWrapper from "./GameRoom/GameRoomWrapper";
import GlobalStyles from "../GlobalStyles";
import { GameRoomContext } from "../GameRoomContext";

const App = () => {
  const { trackUrl, audioRef } = React.useContext(GameRoomContext);
  return (
    <Router>
      <Background>
        <Header />
        <Player src={trackUrl} ref={audioRef}>
          I'm sorry, your browser doesn't support audio
        </Player>
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

const Player = styled.audio``;
