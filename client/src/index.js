import React from "react";
import ReactDOM from "react-dom";

import FireBaseContextProvider from "./FirebaseContext";
import CurrentUserContextProvider from "./CurrentUserContext";
import App from "./components/App";

ReactDOM.render(
  <FireBaseContextProvider>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </FireBaseContextProvider>,
  document.getElementById("root")
);
