import React, { createContext } from "react";
import * as firebase from "firebase";

export const FireBaseContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyCvDktR2m3-rIU3ddPsLkqT2Yfp4EASteA",
  authDomain: "you-beat-me-to-it.firebaseapp.com",
  databaseURL: "https://you-beat-me-to-it.firebaseio.com",
  projectId: "you-beat-me-to-it",
  storageBucket: "you-beat-me-to-it.appspot.com",
  messagingSenderId: "1075878771170",
  appId: "1:1075878771170:web:253cca6ef4a7e1e7a8e1bb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const FireBaseContextProvider = ({ children }) => {
  return (
    <FireBaseContext.Provider firebaseApp={firebaseApp}>
      {children}
    </FireBaseContext.Provider>
  );
};

export default FireBaseContextProvider;
