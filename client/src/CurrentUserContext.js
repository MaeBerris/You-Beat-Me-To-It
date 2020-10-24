import React from "react";

export const CurrentUserContext = React.createContext(null);

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [usersList, setUsersList] = React.useState(null);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, usersList, setUsersList }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
