import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FireBaseContextProvider from "./FirebaseContext";
import CurrentUserContextProvider from "./CurrentUserContext";
import LobbyContextProvider from "./LobbyContext";
import GameRoomContextProvider from "./GameRoomContext";
import App from "./components/App";

ReactDOM.render(
  <FireBaseContextProvider>
    <CurrentUserContextProvider>
      <LobbyContextProvider>
        <GameRoomContextProvider>
          <App />
        </GameRoomContextProvider>
      </LobbyContextProvider>
    </CurrentUserContextProvider>
  </FireBaseContextProvider>,
  document.getElementById("root")
);
