import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import PlayerHandler from "../SignIn/PlayerHandler";
import SignIn from "../SignIn/SignIn";
import HostLobby from "../Lobby/HostLobby";
import FourOFour from "../FourOFour/FourOFour";
import * as firebase from "firebase";

const LobbyWrapper = () => {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const {
    setRoomId,
    roomExists,
    roomIdState,
    setRoomExists,
  } = React.useContext(LobbyContext);

  const { roomId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    const roomRef = firebase.database().ref(`Rooms/${roomId}`);

    roomRef.on("value", (snapshot) => {
      setRoomExists(snapshot.exists());
    });
  }, [roomId]);

  React.useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);

  React.useEffect(() => {
    console.log(history.action);

    return () => {
      console.log(history.action);
      if (history.action === "POP")
        if (
          window.confirm("do you really want to leave ?") &&
          currentUser !== null
        ) {
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

  if (roomExists === false) {
    return <FourOFour />;
  }

  if (!currentUser && roomExists === true) {
    return (
      <SignIn
        buttonHandler={PlayerHandler}
        buttonMessage="Join your friends game !"
      />
    );
  }
  return <>{roomExists === true && <HostLobby />}</>;
};

export default LobbyWrapper;
