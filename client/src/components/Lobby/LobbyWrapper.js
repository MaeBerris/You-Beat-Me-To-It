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
  const {
    currentUser,
    setCurrentUser,
    isHostPresent,
    setCurrentRoomId,
  } = React.useContext(CurrentUserContext);
  const { setRoomId, roomExists, setRoomExists, location } = React.useContext(
    LobbyContext
  );
  console.log("isHostPresent", isHostPresent);

  console.log("currentUser", currentUser);

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
    setCurrentRoomId(roomId);
  }, [roomId]);

  React.useEffect(() => {
    console.log("isHostPresent in useEffect", isHostPresent);
  }, [isHostPresent]);

  // React.useEffect(() => {
  //   console.log(history.action);

  //   return () => {
  //     console.log(history.action);
  //     if (history.action === "POP" && location === "lobby")
  //       if (
  //         window.confirm("do you really want to leave ?") &&
  //         currentUser !== null
  //       ) {
  //         setCurrentUser(null);
  //         fetch("/deleteUser", {
  //           method: "DELETE",
  //           body: JSON.stringify({ currentUser, roomId }),
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then((data) => console.log(data));
  //         return;
  //       } else if (location === "lobby") {
  //         console.log("history push from Lobby");
  //         history.push(`/lobby/${roomId}`);
  //       }
  //   };
  // }, [history, location]);

  if (roomExists === false) {
    return <FourOFour />;
  }
  if (isHostPresent === false) {
    return <div>host is not present</div>;
  }
  if (!currentUser && roomExists === true && isHostPresent === true) {
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
        <div>loading</div>
      )}
    </>
  );
};

export default LobbyWrapper;
