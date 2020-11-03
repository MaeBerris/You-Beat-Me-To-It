import React from "react";
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
  const [currentTrackGuesses, setCurrentTrackGuesses] = React.useState(null);

  React.useEffect(() => {
    if (currentRoomId) {
      const PlayersRef = firebase
        .database()
        .ref(`Rooms/${currentRoomId}/players`);
      PlayersRef.on("value", (snapshot) => {
        const players = snapshot.val();
        const SortedArray = Object.values(players).sort((a, b) => {
          return b.points - a.points;
        });
        setUsersList(SortedArray);
      });
    }
  }, [setUsersList, currentRoomId]);

  React.useEffect(() => {
    const currentGuessesRef = firebase
      .database()
      .ref(`Rooms/${currentRoomId}/currentTrack/correctGuesses`);

    currentGuessesRef.on("value", (snapshot) => {
      setCurrentTrackGuesses(snapshot.val());
    });
  }, [currentRoomId]);

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
        currentTrackGuesses,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
