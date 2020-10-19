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

const App = () => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const unloadFunction = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", unloadFunction);
  }, []);

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
