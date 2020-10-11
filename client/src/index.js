import React from "react";
import ReactDOM from "react-dom";

import FireBaseContextProvider from "./FirebaseContext";
import App from "./components/App";

ReactDOM.render(
  <FireBaseContextProvider>
    <App />
  </FireBaseContextProvider>,
  document.getElementById("root")
);
