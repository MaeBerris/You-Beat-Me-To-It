import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import { GameRoomContext } from "../../GameRoomContext";
import Spinner from "../Spinner/Spinner";
import PlayerHandler from "../SignIn/PlayerHandler";
import SignIn from "../SignIn/SignIn";
import HostLobby from "../Lobby/HostLobby";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import GameInProgress from "../ErrorScreen/GameInProgress";
import * as firebase from "firebase";

const LobbyWrapper = () => {
  const {
    currentUser,
    setCurrentUser,
    isHostPresent,
    setCurrentRoomId,
  } = React.useContext(CurrentUserContext);
  const {
    setRoomId,
    roomExists,
    setRoomExists,
    location,
    deletePlaylist,
  } = React.useContext(LobbyContext);
  const { setGameStarted, setHistoryArray } = React.useContext(GameRoomContext);

  const { roomId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    const roomRef = firebase.database().ref(`Rooms/${roomId}`);

    roomRef.on("value", (snapshot) => {
      setRoomExists(snapshot.exists());
    });

    return () => {
      roomRef.off();
    };
  }, [roomId]);

  React.useEffect(() => {
    setRoomId(roomId);
    setCurrentRoomId(roomId);
  }, [roomId]);

  React.useEffect(() => {
    console.log(history.action);

    return () => {
      console.log(history.action);
      if (history.action === "POP" && location === "lobby" && currentUser)
        if (
          window.confirm("do you really want to leave ?") &&
          currentUser !== null
        ) {
          setCurrentUser(null);
          setGameStarted(false);
          deletePlaylist();
          setHistoryArray([]);
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
          history.push("/");
          return;
        } else if (location === "lobby") {
          console.log("history push from Lobby");
          history.push(`/lobby/${roomId}`);
        }
    };
  }, [history, location]);

  if (roomExists === false) {
    return (
      <ErrorScreen
        title="404 - Room not found"
        message="We're sorry, we couldn't find the room you are trying to join"
      />
    );
  }
  if (isHostPresent === false) {
    return (
      <ErrorScreen
        title="The host has left"
        message="We're sorry, the host has left and the game has ended. Return to the homepage to start a new game."
      />
    );
  }
  if (
    !currentUser &&
    roomExists === true &&
    isHostPresent === true &&
    location === "gameRoom"
  ) {
    return <GameInProgress />;
  }
  if (
    !currentUser &&
    roomExists === true &&
    isHostPresent === true &&
    location === "lobby"
  ) {
    return (
      <SignIn
        buttonHandler={PlayerHandler}
        buttonMessage="Join your friends game !"
      />
    );
  }

  return (
    <>
      {roomExists === true && isHostPresent === true && currentUser ? (
        <HostLobby />
      ) : (
        <Spinner size={50} color={"lightgrey"} />
      )}
    </>
  );
};

export default LobbyWrapper;
