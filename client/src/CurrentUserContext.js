import React from "react";

export const CurrentUserContext = React.createContext(null);

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [usersList, setUsersList] = React.useState(null);
  console.log("currentUser", currentUser);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, usersList, setUsersList }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
