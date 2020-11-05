import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import PlayerHandler from "../SignIn/PlayerHandler";
import SignIn from "../SignIn/SignIn";
import HostLobby from "../Lobby/HostLobby";

const LobbyWrapper = () => {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const { setRoomId } = React.useContext(LobbyContext);
  const { roomId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);

  React.useEffect(() => {
    console.log(history.action);

    return () => {
      console.log(history.action);
      if (history.action === "POP")
        if (window.confirm("do you really want to leave ?")) {
          setCurrentUser(null);
          fetch("/deleteUser", {
            method: "DELETE",
            body: JSON.stringify({ currentUser, roomId }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
          return;
        } else {
          history.push(`/lobby/${roomId}`);
        }
    };
  }, [history]);
  if (!currentUser) {
    return (
      <SignIn
        buttonHandler={PlayerHandler}
        buttonMessage="Join your friends game !"
      />
    );
  }
  return (
    <>
      <HostLobby />
    </>
  );
};

export default LobbyWrapper;
