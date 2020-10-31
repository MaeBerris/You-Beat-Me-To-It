import React from "react";
import { useParams, useLocation } from "react-router-dom";
import * as firebase from "firebase";

export const CurrentUserContext = React.createContext(null);

const CurrentUserContextProvider = ({ children }) => {
  const [currentRoomId, setCurrentRoomId] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [usersList, setUsersList] = React.useState(null);
  const [correctGuess, setCorrectGuess] = React.useState({
    artist: false,
    songName: false,
    time: null,
  });

  React.useEffect(() => {
    if (currentRoomId) {
      const PlayersRef = firebase
        .database()
        .ref(`Rooms/${currentRoomId}/players`);
      PlayersRef.on("value", (snapshot) => {
        const players = snapshot.val();
        const SortedArray = Object.values(players).sort((a, b) => {
          return a.points - b.points;
        });
        setUsersList(SortedArray);
      });
    }
  }, [setUsersList, currentRoomId]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        usersList,
        setUsersList,
        correctGuess,
        setCorrectGuess,
        setCurrentRoomId,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
