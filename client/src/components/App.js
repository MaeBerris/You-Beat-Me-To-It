import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Background from "./Background/Background";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import HostHandler from "./SignIn/HostHandler";
import PlayerHandler from "./SignIn/PlayerHandler";
import HostLobby from "./Lobby/HostLobby";
import GlobalStyles from "../GlobalStyles";
import { CurrentUserContext } from "../CurrentUserContext";
import { LobbyContext } from "../LobbyContext";

const App = () => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { roomId } = React.useContext(LobbyContext);

  const unloadFunction = (e) => {
    if (currentUser !== null) {
      navigator.sendBeacon(
        "/unload",
        JSON.stringify({ currentUser: currentUser, roomId: roomId })
      );
    }
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", unloadFunction, false);

    return () => {
      window.removeEventListener("beforeunload", unloadFunction);
    };
  }, [currentUser, roomId]);

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
              <HostLobby />
            ) : (
              <SignIn
                buttonHandler={PlayerHandler}
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
