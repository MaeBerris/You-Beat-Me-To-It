import React from "react";

export const CurrentUserContext = React.createContext(null);

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [usersList, setUsersList] = React.useState(null);
  const [correctGuess, setCorrectGuess] = React.useState({
    artist: false,
    songName: false,
    time: null,
  });
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        usersList,
        setUsersList,
        correctGuess,
        setCorrectGuess,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
